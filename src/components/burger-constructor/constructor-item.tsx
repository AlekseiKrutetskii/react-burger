import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {constructors} from "../../services/slices/constructors";
import {useDispatch} from '../../services/hooks';
import {useDrag, useDrop} from 'react-dnd';
import {TItem} from "../../types";

type TConstructorItemProps = {
    item: TItem,
    index: number,
    id: string,
    moveConstructorItem: (dragIndex:number, hoverIndex:number) => void
}

const ConstructorItem:React.FC<TConstructorItemProps> = ({item, index, id, moveConstructorItem}) => {
    const dispatch = useDispatch();

    const delFromConstructor = (item:TItem):void => {
        dispatch(constructors.actions.del({item}))
    }

    const ref = useRef<HTMLLIElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'citem',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item:TConstructorItemProps, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = (clientOffset) ? clientOffset.y - hoverBoundingRect.top : 0;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveConstructorItem(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'citem',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));


    return (
        <li ref={ref} style={{opacity}} data-handler-id={handlerId} key={item.customId} className="mb-4" data-modaltype='Ingredients' data-item={JSON.stringify(item)}><DragIcon type="primary" /><ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={()=>delFromConstructor(item)} /></li>
    )
}

export default ConstructorItem;