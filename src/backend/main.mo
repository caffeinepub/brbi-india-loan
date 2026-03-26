import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization setup
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Application ID counter
  var nextApplicationId = 1;

  // Loan Status comparison
  module LoanStatus {
    public func compare(a : LoanStatus, b : LoanStatus) : Order.Order {
      Nat.compare(loanStatusToNat(a), loanStatusToNat(b));
    };

    func loanStatusToNat(status : LoanStatus) : Nat {
      switch (status) {
        case (#pending) { 0 };
        case (#under_review) { 1 };
        case (#approved) { 2 };
        case (#rejected) { 3 };
        case (#cancelled) { 4 };
      };
    };
  };

  // Type Definitions
  type LoanProduct = {
    #personal_loan;
    #instant_loan;
  };

  type EmploymentType = {
    #salaried;
    #self_employed;
    #unemployed;
  };

  type LoanStatus = {
    #pending;
    #under_review;
    #approved;
    #rejected;
    #cancelled;
  };

  module LoanApplication {
    public func compare(a : LoanApplication, b : LoanApplication) : Order.Order {
      Nat.compare(a.applicationId, b.applicationId);
    };
  };

  public type LoanApplicationSubmission = {
    fullName : Text;
    phone : Text;
    email : Text;
    amountRequested : Nat;
    loanProduct : LoanProduct;
    tenureMonths : Nat;
    monthlyIncome : Nat;
    employmentType : EmploymentType;
  };

  public type LoanApplication = {
    applicant : Principal;
    submission : LoanApplicationSubmission;
    applicationId : Nat;
    status : LoanStatus;
    createdAt : Time.Time;
    updatedAt : Time.Time;
    platformFeePaid : Bool;
    upiTransactionId : ?Text;
  };

  // Persistent Storage
  let applications = Map.empty<Nat, LoanApplication>();
  let userApplications = Map.empty<Principal, List.List<Nat>>();

  // Modules for Text comparisons
  module Pair {
    public func compare(a : (Text, Nat), b : (Text, Nat)) : Order.Order {
      switch (Text.compare(a.0, b.0)) {
        case (#equal) { Nat.compare(a.1, b.1) };
        case (order) { order };
      };
    };
  };

  // Loan Products Data
  public type LoanProductDetails = {
    name : Text;
    maxAmount : Nat;
    minTenure : Nat;
    maxTenure : Nat;
    interestRate : Float;
    description : Text;
  };

  public query ({ caller }) func getLoanProducts() : async [LoanProductDetails] {
    [
      {
        name = "Personal Loan";
        maxAmount = 500_000;
        minTenure = 12;
        maxTenure = 60;
        interestRate = 10.5;
        description = "Up to 5 lakh, 12-60 months, 10.5% APR";
      },
      {
        name = "Instant Loan";
        maxAmount = 100_000;
        minTenure = 3;
        maxTenure = 24;
        interestRate = 14.0;
        description = "Up to 1 lakh, 3-24 months, 14% APR";
      },
    ];
  };

  // Loan Application Submission
  public shared ({ caller }) func submitLoanApplication(submission : LoanApplicationSubmission) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can submit loan applications");
    };

    let id = nextApplicationId;
    nextApplicationId += 1;

    let application : LoanApplication = {
      applicant = caller;
      submission;
      applicationId = id;
      status = #pending;
      createdAt = Time.now();
      updatedAt = Time.now();
      platformFeePaid = false;
      upiTransactionId = null;
    };
    applications.add(id, application);

    // Track user applications
    switch (userApplications.get(caller)) {
      case (null) {
        let newList = List.fromArray<Nat>([id]);
        userApplications.add(caller, newList);
      };
      case (?existing) {
        existing.add(id);
      };
    };
    id;
  };

  // Get Application by ID (with access control)
  public query ({ caller }) func getApplication(id : Nat) : async LoanApplication {
    switch (applications.get(id)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) {
        if (
          caller != app.applicant and not AccessControl.isAdmin(accessControlState, caller)
        ) {
          Runtime.trap("Unauthorized: Cannot view applications of others");
        };
        app;
      };
    };
  };

  // Get All Applications (Admin Only)
  public query ({ caller }) func getAllApplications() : async [LoanApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all applications");
    };
    applications.values().toArray().sort();
  };

  // Get Applications by Status (Admin Only)
  public query ({ caller }) func getApplicationsByStatus(status : LoanStatus) : async [LoanApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view applications by status");
    };
    applications.values().toArray().filter(func(app) { app.status == status });
  };

  // Get User's Applications
  public query ({ caller }) func getUserApplications() : async [LoanApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view their applications");
    };
    let userApps = switch (userApplications.get(caller)) {
      case (null) { List.empty<Nat>() };
      case (?ids) { ids };
    };

    userApps.toArray().map(func(id) { applications.get(id) }).filterMap(func(app) { app }).sort();
  };

  // Update Application Status (Admin Only)
  public shared ({ caller }) func updateApplicationStatus(id : Nat, status : LoanStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update application status");
    };
    switch (applications.get(id)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) {
        let updatedApp : LoanApplication = {
          applicant = app.applicant;
          submission = app.submission;
          applicationId = app.applicationId;
          status;
          createdAt = app.createdAt;
          updatedAt = Time.now();
          platformFeePaid = app.platformFeePaid;
          upiTransactionId = app.upiTransactionId;
        };
        applications.add(id, updatedApp);
      };
    };
  };

  // Record Platform Fee Payment
  public shared ({ caller }) func recordPlatformFeePayment(applicationId : Nat, upiTransactionId : Text) : async () {
    let application = switch (applications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) {
        if (caller != app.applicant and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the applicant or admins can record fee payment");
        };
        app;
      };
    };
    let updatedApplication : LoanApplication = {
      applicant = application.applicant;
      submission = application.submission;
      applicationId = application.applicationId;
      status = application.status;
      createdAt = application.createdAt;
      updatedAt = Time.now();
      platformFeePaid = true;
      upiTransactionId = ?upiTransactionId;
    };
    applications.add(applicationId, updatedApplication);
  };

  // Get Application Status (Applicant or Admin only)
  public query ({ caller }) func checkApplicationStatus(id : Nat) : async LoanStatus {
    switch (applications.get(id)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) {
        if (caller != app.applicant and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the applicant or admins can check application status");
        };
        app.status;
      };
    };
  };

  // Cancel Application (User Only)
  public shared ({ caller }) func cancelApplication(id : Nat) : async () {
    switch (applications.get(id)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) {
        if (app.applicant != caller) {
          Runtime.trap("Unauthorized: Only the applicant can cancel the application");
        };
        let updatedApp : LoanApplication = {
          applicant = app.applicant;
          submission = app.submission;
          applicationId = app.applicationId;
          status = #cancelled;
          createdAt = app.createdAt;
          updatedAt = Time.now();
          platformFeePaid = app.platformFeePaid;
          upiTransactionId = app.upiTransactionId;
        };
        applications.add(id, updatedApp);
      };
    };
  };

  // Get Platform Fee Payment Status (Applicant or Admin only)
  public query ({ caller }) func getPlatformFeePaymentStatus(applicationId : Nat) : async Bool {
    switch (applications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) {
        if (caller != app.applicant and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the applicant or admins can check payment status");
        };
        app.platformFeePaid;
      };
    };
  };
};
