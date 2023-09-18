import { AuthWrapper } from "@/components/AuthWrapper";
import SignupForm from "@/components/SignupForm";

const SignupPage: React.FC = () => {
    return (
      <AuthWrapper>
        <SignupForm />
      </AuthWrapper>
    );
};

export default SignupPage;
