import React from "react"
import { User } from "../App"
import { deleteIcon, editing } from "../assets";

interface UserItemProps {
    users: User;
    onDelete: (item: User) => void;
    onEdit: (item: User) => void;
}


const UserItem: React.FC<UserItemProps> = (props) => {
    const { users, onDelete, onEdit } = props;
    const { id, name, company } = users;
    const { catchPhrase } = company;

    return (
        <li key={id} className="border-solid border-2 border-gray-500 p-8 m-8 flex justify-between items-center rounded-md">
            <div className="group relative mr-5">
                <h3 className="text-lg font-semibold leading-6 text-break">
                    {`Title: ${name}`}
                </h3>
                <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600 text-break">{`Description: ${catchPhrase}`}</p>
            </div>
            <div className="flex flex-col items-end">
                <img
                    style={{ cursor: 'pointer' }}
                    onClick={() => onDelete(users)}
                    className="min-h-[30px] min-w-[30px] w-8 h-8 block flex-none rounded-full bg-gray-50"
                    src={deleteIcon} alt="" />
                <img
                    style={{ cursor: 'pointer' }}
                    onClick={() => onEdit(users)}
                    className="min-h-[30px] min-w-[30px] w-8 h-8 block flex-none bg-gray-50"
                    src={editing} alt="" />
            </div>
        </li>
    )
}

export default UserItem;