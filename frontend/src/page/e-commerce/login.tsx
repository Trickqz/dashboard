"use client"

import Loginimagem from "./img/login.jpg"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

const formSchema = z.object({
    email: z.string().min(1, {
        message: "Email must be at least @",
    }),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters.",
    }),
})

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="h-[100vh] w-full flex-row flex">
            <div className="w-2/4 h-full relative flex items-center justify-center bg-white">
                <h1 className="text-black text-xl absolute top-16 left-16">Logo</h1>
                <img className="h-[800px]" src={Loginimagem} alt="" />
            </div>
            <div className="h-full relative flex justify-center items-center flex-col bg-white w-2/4">
            <Link to="/shop"><h1 className="absolute cursor-pointer text-[#8692A6] hover:opacity-70 transition flex items-center justify-center top-10 left-10"><ChevronLeft className="mr-1" width={20} height={20} /> back</h1></Link>
                <div className="max-w-[427px]">
                    <div>
                        <h1 className="text-3xl text-black font-bold">Account Login</h1>
                        <p className="text-[#8692A6] mt-3">If you are already a member you can login with your email address and password.</p>
                    </div>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10 text-black">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#696F79]">Email address</FormLabel>
                                            <FormControl>
                                                <Input type="email" className="border-[#8692A6] h-12" placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#696F79]">Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" className="border-[#8692A6] h-12" placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full h-12 bg-[#007DFE]" type="submit">Login</Button>
                            </form>
                        </Form>
                        <div className="flex justify-center mt-10">
                            <h1 className="text-[#696F79]">I don't have an account <Link to="/register"><span className="text-[#007DFE] font-bold cursor-pointer hover:underline">Sign up here</span></Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}