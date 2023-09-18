/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

interface AuthWrapperProps {
    children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    return (
        <>
            <div className="min-h-[100vh] flex">
                <div className="grow w-[50vw] flex items-center">
                    <div className="my-auto px-28 rounded-lg w-full">
                        <h1 className="text-4xl mb-2 text-[#0D0958]">Olá, bem-vindo de volta!</h1>
                        <h3 className="text-xl text-[#7A7C95] mb-4">É um prazer ter você aqui.</h3>
                        {children}
                    </div>
                </div>
                <div className="w-[50vw] relative">
                    <div className="w-[90%] h-[90%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-3xl">
                        <div className="absolute top-36 left-[50%] w-[60%] translate-x-[-50%] z-10 rounded-tl-4xl">
                            <h1 className="text-white font-bold text-4xl">
                                Previsão de Problemas no Sistema de Bleed da Azul
                            </h1>
                            <h5 className="text-white mt-4 text-xl">
                                Faça login com suas credenciais para acessar os relatórios e diagnósticos.
                            </h5>
                        </div>
                        <img src={"https://d1gyjlvk5cyqi7.cloudfront.net/login.jpg"}  alt="Home" className="object-fill w-full h-full" />
                    </div>
                </div>
            </div>
        </>
    );
};
