# BRBI India Loan

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Landing page with hero section for BRBI India Loan brand
- Personal loan and instant loan product pages
- Loan application form (name, phone, amount, tenure, income)
- Login/signup page for user accounts
- UPI payment page for 99 rupee platform processing fee
- Documentation page (eligibility, required docs, terms, FAQs)
- Dashboard for logged-in users to view loan application status
- Role-based access: regular user and admin

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: user auth via authorization component, loan application submission and status tracking, loan product data
2. Frontend: landing page, loan products section, application form, UPI payment step (show UPI ID + QR for 99 rs fee), login/signup, documentation, user dashboard
3. Static UPI payment UI (UPI ID display + fake confirmation) since no live payment gateway
