export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export enum OrderStatus {
    'created' = 'Создан',
    'pending' = 'Готовится',
    'done' = 'Выполнен'
}

export type TOrder = {
    ingredients: Array<string>,
    _id: string,
    status: 'created'|'pending'|'done',
    number: number,
    createdAt: string,
    updatedAt: string,
    name: string
}

export type TOrdersList = {
    success: boolean,
    orders: Array<TOrder>,
    total: number,
    totalToday: number
}