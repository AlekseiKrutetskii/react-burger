import React, {useRef} from 'react';
import PropTypes from "prop-types";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {constructors} from "../../services/reducers/constructors";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from 'react-dnd';

function ConstructorItem(props) {
    const dispatch = useDispatch();

    const delFromConstructor = (item) => {
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
        hover(item:any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;
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
            props.moveConstructorItem(dragIndex, hoverIndex);
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
            return { id: props.id, index: props.index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));


    return (
        <li ref={ref} style={{opacity}} data-handler-id={handlerId} key={props.item.customId} className="mb-4" data-modaltype='Ingredients' data-item={JSON.stringify(props.item)}><DragIcon type="primary" /><ConstructorElement text={props.item.name} price={props.item.price} thumbnail={props.item.image} handleClose={()=>delFromConstructor(props.item)} /></li>
    )
}

export default ConstructorItem;

ConstructorItem.propTypes = {
    item: PropTypes.any,
    index: PropTypes.number,
    id: PropTypes.string,
    moveConstructorItem: PropTypes.func
};
