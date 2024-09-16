import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DraggableItem';
import DropArea from './DropArea';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Cable, Calendar, Database, Eye, Grid2X2, Images, LogOut, MessageCircleQuestion, Monitor, Plus, Redo2, Settings, Share2, Smartphone, Tablet, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const iconClasses = 'w-8 h-8 cursor-pointer rounded-md transition flex justify-center items-center opacity-50 hover:opacity-100';

export default function DndProviderWrapper() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-row relative">
        <div className="fixed h-full">
          <aside className="w-16 relative border-r bg-primary-foreground h-full flex items-center flex-col">
            <div className="space-y-3">
              <Avatar className="mt-5 w-11 h-11 cursor-pointer">
                <AvatarImage src="https://github.com/Trickqz.png" alt="@Trickqz" />
              </Avatar>
              <Separator className="w-10 bg-primary/20" />
            </div>
            <div className="mt-6 space-y-5">
              <div className={`${iconClasses} bg-accent-foreground/20`}><Plus /></div>
              <div className={iconClasses}><Grid2X2 /></div>
              <div className={iconClasses}><Calendar /></div>
              <div className={iconClasses}><Database /></div>
              <div className={iconClasses}><Images /></div>
              <div className={iconClasses}><Cable /></div>
              <div className="absolute bottom-10 space-y-5">
                <div className={iconClasses}><MessageCircleQuestion /></div>
                <div className={iconClasses}><Settings /></div>
                <div className={iconClasses}><LogOut /></div>
              </div>
            </div>
          </aside>
        </div>
        <header className="w-full h-16 border-b bg-primary-foreground flex justify-between items-center pl-8 pr-8 ml-16">
          <div className="flex flex-row space-x-1">
            <div className={`${iconClasses} opacity-70 hover:opacity-100`}><Monitor width={20} height={20} /></div>
            <div className={`${iconClasses} opacity-70 hover:opacity-100`}><Tablet width={20} height={20} /></div>
            <div className={`${iconClasses} opacity-70 hover:opacity-100`}><Smartphone width={18} height={18} /></div>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <div className={`${iconClasses} opacity-70 hover:opacity-100`}><Undo2 width={20} height={20} /></div>
            <div className={`${iconClasses} opacity-70 hover:opacity-100`}><Redo2 width={20} height={20} /></div>
            <Separator orientation="vertical" className="bg-primary/15 h-5 w-[1px]" />
            <div className={`${iconClasses} opacity-70 hover:opacity-100`}><Share2 width={20} height={20} /></div>
            <div className={`${iconClasses} opacity-70 hover:opacity-100`}><Eye width={20} height={20} /></div>
            <Separator orientation="vertical" className="bg-primary/15 h-5 w-[1px]" />
            <Button className="ml-2 w-20 h-8">Save</Button>
          </div>
        </header>
      </div>
      <div className="w-full pl-16">
        <div>
          <DropArea />
          {/* <DraggableItem id="text" text="Text" /> */}
        </div>
        <div className='w-80 overflow-auto h-3/5 space-y-3 bg-primary-foreground fixed right-8 rounded-md border p-6 top-2/4 transform -translate-y-2/4'>
          <Select>
            <SelectTrigger className="h-10 border bg-background/50">
              <SelectValue placeholder="Basic" />
            </SelectTrigger>
            <SelectContent className='bg-background/50'>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='grid grid-cols-2 gap-3'>
            <div className='bg-background/50 rounded-md border w-full h-32'></div>
            <div className='bg-background/50 rounded-md border w-full h-32'></div>
            <div className='bg-background/50 rounded-md border w-full h-32'></div>
            <div className='bg-background/50 rounded-md border w-full h-32'></div>
            <div className='bg-background/50 rounded-md border w-full h-32'></div>
            <div className='bg-background/50 rounded-md border w-full h-32'></div>
            <div className='bg-background/50 rounded-md border w-full h-32'></div>
            <div className='bg-background/50 rounded-md border w-full h-32'></div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}