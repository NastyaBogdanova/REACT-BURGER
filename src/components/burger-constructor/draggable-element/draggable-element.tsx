import { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from '../../../services/types/hooks';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import styles from "../burger-constructor.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import update from 'immutability-helper';
import { updateIngredients, deleteIngredient } from '../../../services/actions/constructor';
import { RootState } from "../../../services/types/index";
import { TConstructorIngredient } from "../../../utils/types";
import { Identifier } from 'dnd-core';

export const DraggableElement = ({ elem, index }: TDraggableElement) => {

    const { stuffings } = useSelector((store: RootState) => store.constructor);

    const dispatch = useDispatch();

    const id: string = elem.id;

    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<TItem, void, { handlerId: Identifier | null }>({
        accept: 'constuctorIngredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset() as XYCoord;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveElement(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'constuctorIngredient',
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref));

    const moveElement = useCallback((dragIndex: number, hoverIndex: number): void => {
        const updatedElements = update(stuffings, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, stuffings[dragIndex]],
            ],
        })
        dispatch(updateIngredients(updatedElements));
    }, [stuffings, dispatch])

    const deleteElement = (id: string): void => {
        dispatch(deleteIngredient(id));
    }

    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className={`${styles.item}`}>
            <span className={styles.dropIcon}>
                <DragIcon type="primary" />
            </span>
            <ConstructorElement
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image}
                handleClose={() => deleteElement(id)}
            />
        </div>

    )
}

type TDraggableElement = {
    elem: TConstructorIngredient;
    index: number;
};

type TItem = {
    id: string;
    index: number;
};

export default DraggableElement;