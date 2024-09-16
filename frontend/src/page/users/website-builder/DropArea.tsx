import { useDrop } from 'react-dnd';
import { useState } from 'react';

interface ItemType {
  id: string;
}

const DropArea = () => {
  const [items, setItems] = useState<string[]>([]);

  const [{ }, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item: ItemType) => {
      setItems((prevItems) => [...prevItems, item.id]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className='w-full min-h-16 border-dotted border border-primary/20 hover:bg-primary/10 cursor-pointer transition flex flex-col justify-center items-center overflow-auto'
    >
      {items.map((item, index) => (
        <div key={index} className='p-4 bg-transparent m-4'>
          {item}
        </div>
      ))}
    </div>
  );
};

export default DropArea;