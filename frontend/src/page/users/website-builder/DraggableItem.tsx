import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, text }: { id: string; text: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className='bg-primary p-8 mt-4 cursor-move'
      style={{opacity: isDragging ? 0.5 : 1,}}>
      {text}
    </div>
  );
};

export default DraggableItem;