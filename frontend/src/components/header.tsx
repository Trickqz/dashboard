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
import { CopyIcon, ExternalLink, ShoppingCart } from "lucide-react";
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
    <header className="w-full relative h-16 border-b lg:flex hidden backdrop-blur justify-between pl-3 pr-3 sm:pl-14 sm:pr-14 dark:border-white/20 border-black/30 items-center flex-row">
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
              <NavigationMenuTrigger className="opacity-60 hover:opacity-100">Extract</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[350px] lg:w-[350px] lg:grid-cols-[.75fr_1fr]">
                  {["Bonification [Extract]", "Income [Extract]"].map((item) => (
                    <li key={item} className="row-span-3 flex flex-col gap-1">
                      <NavLink
                        to={`/${item.toLowerCase().replace(/\s+/g, '-').replace(/\[extract\]/g, '').trim()}`}
                        className={({ isActive }) =>
                          `hover:dark:text-white hover:text-black cursor-pointer ${isActive ? "text-black dark:text-white opacity-100" : "text-black/80 dark:text-white/60 opacity-60"
                          }`
                        }
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>

            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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
          <Input className="w-60 md:flex hidden" placeholder="Search..." />
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
