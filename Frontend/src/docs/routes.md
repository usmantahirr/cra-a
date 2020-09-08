## Routes

#### Auth:
- `/login` b2b redirection. This container will have redirect code
- `/signup` (includes OTP to verify Phone and Email)
- `/forgot` (Question)

#### Dashboard
- `/dashboard` Will just be a container, and will redirect based on user details
`(
    If user test registration found and already have application, send to manage,
    else apply for new one
)`

#### Medical Test Registration
- `/register` This page will do everything based on steps, and it's data
    - Visa Type
    - Test Type
    - Visa issuing Emirate
    - Application Form
    - Upload Documents
    - Screening Facility
    - Payment
    - confirmation modal

#### Test application management
- `/application`
    - Table showing your application along with its status