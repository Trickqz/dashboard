import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CopyIcon, ExternalLink, FileSymlink, ShoppingCart, UserCog } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "./ui/separator";

function ReportSection({ title }: { title: string }) {
  const [date, setDate] = React.useState<Date>();
  const [date2, setDate2] = React.useState<Date>();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <a className="hover:dark:text-white hover:text-black cursor-pointer">
          {title}
        </a>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{`${title} report`}</SheetTitle>
          <SheetDescription>
            Use filters to generate the report.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-left mt-5">
              Report type:
            </Label>
            <Select>
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Single" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="details">Details</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DatePicker label="Date of" date={date} setDate={setDate} />
          <DatePicker label="Date until" date={date2} setDate={setDate2} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="w-full">Generate report</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function DatePicker({ label, date, setDate }: { label: string; date: Date | undefined; setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="name" className="text-left">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal h-11",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function Header() {
  return (
    <header className="w-full z-50 relative h-16 border-b lg:flex hidden backdrop-blur justify-between pl-3 pr-3 sm:pl-14 sm:pr-14 dark:border-white/20 border-black/30 items-center flex-row">
      <nav className="gap-4 flex text-sm font-normal items-center dark:text-white/60 text-black/80">
        {["Dashboard", "Network", "Wallet", "Withdrawal", "My Investments"].map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
            className={({ isActive }) =>
              `transition-all duration-200 ease-in-out hover:dark:text-white hover:text-black ${isActive ? "text-black dark:text-white opacity-100" : "text-black/80 dark:text-white/60 opacity-60"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="opacity-60 hover:opacity-100">Report</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]">
                  {["Investments", "Financial", "Recommendations"].map((title) => (
                    <li key={title} className="row-span-3 flex flex-col gap-1 dark:text-white/60 text-black/80">
                      <ReportSection title={title} />
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row gap-2">
          <Button variant="outline"><ShoppingCart className="mr-1" width={14} />Buy</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><ExternalLink className="mr-1" width={14} />Share</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share with friends</DialogTitle>
                <DialogDescription>To make it easier, you can share by QRCode. Just ask your friend to scan the code below.</DialogDescription>
              </DialogHeader>
              <Separator />
              <div className="flex justify-center p-4">
                <img className="w-60 h-60" src="https://github.com/endroid/qr-code/blob/main/.github/example.png?raw=true" alt="" />
              </div>
              <Separator />
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <div className='relative'>
                    <span className='absolute left-2 top-1/2 transform text-sm opacity-50 -translate-y-1/2'>/create-account/</span>
                    <Input
                      className='pl-28'
                      id="link"
                      defaultValue="officialaccount"
                      readOnly
                    />
                  </div>
                </div>
                <Button type="submit" size="sm" className="px-3 h-10 transition hover:opacity-50">
                  <span className="sr-only">Copy</span>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-row gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-60 h-10 justify-between md:flex hidden text-muted-foreground relative">Search...
                <kbd className="pointer-events-none absolute right-[0.7rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K</kbd>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0">
              <DialogHeader>
                <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 shrink-0 opacity-50"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                  <Input className="bg-transparent border-none h-10 text-sm" placeholder="Type a command or search..." />
                </div>
              </DialogHeader>
              <div className="p-1 pt-0">
                <div className="pb-1">
                  <Button variant="outline" className="w-full h-10 border-none flex justify-start font-normal"><FileSymlink className="mr-2" width={18} />Dashboard</Button>
                  <Button variant="outline" className="w-full h-10 border-none flex justify-start font-normal"><FileSymlink className="mr-2" width={18} />Network</Button>
                  <Button variant="outline" className="w-full h-10 border-none flex justify-start font-normal"><FileSymlink className="mr-2" width={18} />Wallet</Button>
                  <Button variant="outline" className="w-full h-10 border-none flex justify-start font-normal"><FileSymlink className="mr-2" width={18} />Withdrawal</Button>
                  <Button variant="outline" className="w-full h-10 border-none flex justify-start font-normal"><FileSymlink className="mr-2" width={18} />investments</Button>
                </div>
                <Separator />
                <div className="mt-1">
                  <Button variant="outline" className="w-full h-10 border-none flex justify-start font-normal"><UserCog className="mr-2" width={18}/>Profile</Button>
                  <Button variant="outline" className="w-full h-10 border-none flex justify-start font-normal"><UserCog className="mr-2" width={18}/>Settings</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <ModeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage className="cursor-pointer" src="https://github.com/Trickqz.png" alt="@Trickqz" />
              <AvatarFallback>PT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {[
                { label: "Profile", shortcut: "⇧⌘P", link: "/profile" },
                { label: "Settings", shortcut: "⌘S", link: "/settings" },
              ].map((item) => (
                <DropdownMenuItem key={item.label}>
                  <Link to={item.link} className="flex items-center w-full h-full">
                    {item.label}
                    <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/logout">Log out</Link>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
