import React from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Banknote, Box, ChartNoAxesCombined, ClipboardMinus, House, Landmark, Users } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function DockDemo() {
  return (
    <div className="left-2/4 bottom-16 lg:hidden z-10 fixed transform -translate-x-2/4">
      <Dock direction="middle">
        <DockIcon>
          <Icons.dashboard className="size-4" />
        </DockIcon>
        <DockIcon>
          <Icons.network className="size-4" />
        </DockIcon>
        <DockIcon>
          <Icons.wallet className="size-4" />
        </DockIcon>
        <DockIcon>
          <Icons.withdraw className="size-4" />
        </DockIcon>
        <DockIcon>
          <Icons.myinvest className="size-4" />
        </DockIcon>
        <DockIcon>
          <Icons.extract className="size-4" />
        </DockIcon>
        <DockIcon>
          <Icons.report className="size-4" />
        </DockIcon>
      </Dock>
    </div>
  );
}

const Icons = {
  dashboard: (props: IconProps) => (
    <House {...props}/>
  ),
  network: (props: IconProps) => (
    <Users {...props}/>
  ),
  wallet: (props: IconProps) => (
    <Banknote {...props}/>
  ),
  withdraw: (props: IconProps) => (
    <Landmark {...props}/>
  ),
  myinvest: (props: IconProps) => (
    <Box {...props}/>
  ),
  extract: (props: IconProps) => (
    <ChartNoAxesCombined {...props}/>
  ),
  report: (props: IconProps) => (
    <ClipboardMinus {...props}/>
  ),
};
