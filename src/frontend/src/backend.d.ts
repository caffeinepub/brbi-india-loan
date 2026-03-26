import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface LoanApplicationSubmission {
    fullName: string;
    email: string;
    employmentType: EmploymentType;
    tenureMonths: bigint;
    phone: string;
    amountRequested: bigint;
    monthlyIncome: bigint;
    loanProduct: LoanProduct;
}
export interface LoanApplication {
    status: LoanStatus;
    applicant: Principal;
    applicationId: bigint;
    createdAt: Time;
    upiTransactionId?: string;
    updatedAt: Time;
    platformFeePaid: boolean;
    submission: LoanApplicationSubmission;
}
export interface LoanProductDetails {
    maxTenure: bigint;
    maxAmount: bigint;
    minTenure: bigint;
    name: string;
    description: string;
    interestRate: number;
}
export enum EmploymentType {
    unemployed = "unemployed",
    self_employed = "self_employed",
    salaried = "salaried"
}
export enum LoanProduct {
    personal_loan = "personal_loan",
    instant_loan = "instant_loan"
}
export enum LoanStatus {
    cancelled = "cancelled",
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    under_review = "under_review"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelApplication(id: bigint): Promise<void>;
    checkApplicationStatus(id: bigint): Promise<LoanStatus>;
    getAllApplications(): Promise<Array<LoanApplication>>;
    getApplication(id: bigint): Promise<LoanApplication>;
    getApplicationsByStatus(status: LoanStatus): Promise<Array<LoanApplication>>;
    getCallerUserRole(): Promise<UserRole>;
    getLoanProducts(): Promise<Array<LoanProductDetails>>;
    getPlatformFeePaymentStatus(applicationId: bigint): Promise<boolean>;
    getUserApplications(): Promise<Array<LoanApplication>>;
    isCallerAdmin(): Promise<boolean>;
    recordPlatformFeePayment(applicationId: bigint, upiTransactionId: string): Promise<void>;
    submitLoanApplication(submission: LoanApplicationSubmission): Promise<bigint>;
    updateApplicationStatus(id: bigint, status: LoanStatus): Promise<void>;
}
