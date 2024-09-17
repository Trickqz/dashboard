import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import Dashboardimg from "../assets/Screenshot_1.png";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Link } from "react-router-dom";
import WordPullUp from "@/components/magicui/word-pull-up";
import BlurFade from "@/components/magicui/blur-fade";
import BlurIn from "@/components/magicui/blur-in";

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex w-full justify-center flex-col">
        <header className="flex items-center backdrop-blur-sm h-14 w-full border-b justify-between pl-72 pr-72">
          <div>
            <a href="">Title</a>
          </div>
          <div className="flex gap-2">
            <Link to="/login"><Button variant="ghost" className="hover:bg-transparent">Login</Button></Link>
            <Link to="/singup"><Button className="bg-secondary text-primary hover:bg-secondary/70">Sing up</Button></Link>
          </div>
        </header>
        <div className="flex flex-col items-center mt-32">
        <BlurFade delay={0.25}>
          <div className="flex justify-center flex-col items-center">
            <Link to="/dashboard"><div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span className="text-sm">✨ Introducing Dashboard Ui</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div></Link>
            <WordPullUp
              className="w-[1100px] font-geist text-8xl font-medium mt-7"
              words="Magic UI is the new way to build landing pages."
            />
            <BlurIn
              word="Beautifully designed, animated components and templates built with Tailwind CSS, React, and Framer Motion."
              className="text-muted-foreground text-center text-lg w-[600px] mt-3"
            />
            <Link to="/singup"><Button className="mt-10 pr-7 pl-7">
              Get Started for free <ArrowRightIcon className="ml-2" width={17} height={17} />
            </Button></Link>
          </div>
          <div className="w-[1400px] rounded-xl bottom-[-60px] blur-3xl absolute dark:bg-primary/20 bg-primary/70 h-[800px]"></div>
          <div className="relative flex items-center flex-col rounded-xl mt-10">
            <img src={Dashboardimg} className="border h-[750px] rounded-xl" />
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
          </BlurFade>
        </div>
    </div>
  );
}