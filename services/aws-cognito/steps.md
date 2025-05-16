## 🔧 Step 1: Set Up AWS Cognito

1. **Create a User Pool**:
   - Navigate to the [Amazon Cognito console](https://console.aws.amazon.com/cognito/).
   - Click on **Manage User Pools** and then **Create a user pool**.
   - Configure the pool settings as per your requirements (e.g., sign-up, sign-in, MFA). 

2. **Create an App Client**:
   - Within your user pool, go to the **App clients** section.
   - Click on **Add an app client**, provide a name, and configure the settings.
   - Note down the **App client ID** and **App client secret** (if enabled).

3. **Set Up an Identity Pool (Optional)**:
   - If you need to grant authenticated users access to AWS services, create an Identity Pool in the [Amazon Cognito Identity Console](https://console.aws.amazon.com/cognito-identity/).
   - Link it to your User Pool and configure the necessary IAM roles. ([Use Amazon Cognito Identity to authenticate users - AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-browser-credentials-cognito.html?utm_source=chatgpt.com), [aws-cognito-express - npm](https://www.npmjs.com/package/aws-cognito-express?utm_source=chatgpt.com))

---

## ⚙️ Step 2: Install Required Node.js Packages

I


## Allowed callback URLs
https://naseerkhan.dev
## Allowed sign-out URLs
http://localhost:3000




## For Login Testing
username : naseerkhan
j)Xa2kU:W-h}a?Q