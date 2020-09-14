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

## Git submodules / Shared components
The following section details the usage of git submodules. An example usecase for this would be where you want to load components present on a different repository while staying on your current one.

- #### Step 1) Create shared components
    Push code/components that you want to share to a repo/branch. Skip this step if you already have code that needs to be shared on a repo.
    
    Example repo: http://enterprisetfs.domain.com/test_repo
    Example branch: shared_components

- #### Step 2) Add components to your existing code
    Now where you want to use those components run the following command. 
     - git submodule add -b <BRANCH> <REPO> <RELATIVE_PATH_TO_LOAD_COMPONENTS>
     
     Example: git submodule add -b shared_components http://enterprisetfs.domain.com/test_repo src/shared

- #### Step 3) Update shared components
    In order to modify shared components, navigate to <RELATIVE_PATH_TO_LOAD_COMPONENTS> and commit your changes as you would do on any other repo/branch.
    
    Push Example: 
    cd src/shared
    git add .
    git commit -m "shared components updated"
    git push
    
    Similarly to fetch any changes made to shared components navigate to <RELATIVE_PATH_TO_LOAD_COMPONENTS> and pull
    .
    Pull Example: 
    cd src/shared
    git pull
    
Note that any commits made without being present on <RELATIVE_PATH_TO_LOAD_COMPONENTS> path, will not affect shared components present on a remote repo/branch
