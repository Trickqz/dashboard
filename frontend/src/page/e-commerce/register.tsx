"use client"

import Registerimagem from "./img/register.jpg"
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
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    firstname: z.string().min(3, {
        message: "First Name must be at least 3 characters.",
    }),
    lastname: z.string().min(3, {
        message: "last Name must be at least 3 characters.",
    }),
    phone: z.string().optional(),
    birthday: z.string().min(8, {
        message: "Phone must be at least 8 number.",
    }),
    password: z.string().min(5, { message: "Password must be at least 5 characters." }).max(15),
    passwordconfirm: z.string().min(5, { message: "Confirm Password is required." }).max(15),
}).refine(data => data.password === data.passwordconfirm, {
    message: "Passwords must match",
    path: ["passwordconfirm"],
});

export default function Register() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            phone: "",
            birthday: "",
            email: "",
            password: "",
            passwordconfirm: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="h-[100vh] w-full flex-row flex">
            <div className="w-full h-full hidden relative lg:flex items-center justify-center bg-white">
                <h1 className="text-black text-xl absolute top-16 left-16">Logo</h1>
                <img className="h-[800px]" src={Registerimagem} alt="" />
            </div>
            <div className="h-full flex relative justify-center items-center flex-col bg-white w-full">
                <Link to="/shop"><h1 className="absolute cursor-pointer text-[#8692A6] hover:opacity-70 transition flex items-center justify-center top-10 left-10"><ChevronLeft className="mr-1" width={20} height={20} /> back</h1></Link>
                <div className="max-w-[427px]">
                    <div>
                        <h1 className="text-3xl text-black font-bold">Account Login</h1>
                        <p className="text-[#8692A6] mt-3">If you are already a member you can login with your email address and password.</p>
                    </div>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10 text-black">
                                <div className="flex flex-row gap-2">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-[#696F79]">First name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" className="border-[#8692A6] h-12" placeholder="Firstname" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-[#696F79]">Last name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" className="border-[#8692A6] h-12" placeholder="lastname" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#696F79]">Phone</FormLabel>
                                            <FormControl>
                                                <Input type="number" className="border-[#8692A6] h-12" placeholder="Phone" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="birthday"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#696F79]">Birthday</FormLabel>
                                            <FormControl>
                                                <Input type="date" className="border-[#8692A6] text-[#696F79] h-12" placeholder="Birthday" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                <FormField
                                    control={form.control}
                                    name="passwordconfirm"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#696F79]">Password Confirm</FormLabel>
                                            <FormControl>
                                                <Input type="password" className="border-[#8692A6] h-12" placeholder="Password Confirm" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full h-12 bg-[#007DFE]" type="submit">Submit</Button>
                            </form>
                        </Form>
                        <div className="flex justify-center mt-10">
                            <h1 className="text-[#696F79]">do I have an account? <Link to="/signin"><span className="text-[#007DFE] font-bold cursor-pointer hover:underline">login here</span></Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}