import { signInAnonymously } from "firebase/auth";
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
    email: string;
    password: string;
}

function Login() {
    const [login, setLogin] = useState(false);
    const {signIn, signUp} = useAuth();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
        if(login) {
                await signIn(email, password);
        }else{
            await signUp(email, password);
        }
    }

    return (
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center
        md:justify-center md:bg-transparent">
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image
                src="https://rb.gy/p2hphi"
                layout="fill"
                className="z-0 !hidden opacity-60 sm:!inline"
                objectFit="cover"
            />

            <img
                src="https://rb.gy/ulxxee"
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                width={150}
                height={150}
            />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0
                md:max-w-md md:px-14">
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className="space-y-4">
                    <label className="inline-block w-full">
                        <input type="email" placeholder="이메일 입력 바람 ㅇㅋ?" className="input" {...register("email", { required: true })} />
                        {errors.email && (
                            <p className="p-1 text-[13px] font-light text-orange-500">
                                이메일을 입력해주세요.
                            </p>
                        )}
                    </label>
                    <label className="inline-block w-full">
                        <input type="password" placeholder="비밀번호 입력 바람 ㅇㅋ?" className="input" {...register("password", { required: true, maxLength: 60 })} />
                        {errors.password && (
                            <p className="p-1 text-[13px] font-light text-orange-500">
                                비밀번호는 4자 이상부터 60자 이내로 입력해주세요.
                            </p>
                        )}
                    </label>
                </div>

                <button className="w-full rounded bg-[#e50914] py-3 font-semibold" onClick={() => setLogin(true)}>Sign In</button>
                <div className="text-[gray]">
                    New to Netflix?{' '}
                    <button className="text-white hover:underline" onClick={() => setLogin(false)}>Sign up now</button>
                </div>
            </form>
        </div>
    )
}

export default Login