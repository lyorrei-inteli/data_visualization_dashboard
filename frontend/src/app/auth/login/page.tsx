import { AuthWrapper } from "@/components/AuthWrapper";
import LoginForm from "@/components/LoginForm";

export const metadata = {
    title: "Login",
    description: "Faça login com suas credenciais para acessar seus afazeres.",
};

const LoginPage: React.FC = () => {
    return (
        <AuthWrapper>
            <LoginForm />
        </AuthWrapper>
    );
};

export default LoginPage;
