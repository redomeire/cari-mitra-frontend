import AppLayout from "../components/layout/AppLayout";
import Typography from "../components/Typography/Typography";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [todo, setTodo] = React.useState<{ 
        name: string ,
        description: string,
        created_at: string,
        updated_at: string
    }>({
        name: '',
        description: '',
        created_at: '',
        updated_at: ''
    });

    const getTodoDetail = () => {
        axios.get(`http://127.0.0.1:3333/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('Authorization')}`
            }
        })
        .then((res) => {
            setTodo(res.data.data)
        })
        .catch((err) => {
            console.log(err.data.message)
        })
    }

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:3333/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('Authorization')}`
            }
        })
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        axios.put('http://127.0.0.1:3333/posts/edit', {
            id: id,
            name: name,
            description: description
        }, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('Authorization')}`
            },
        })
        .then(res => {
            console.log(res);
            // navigate('/')
        })
        .catch(err => {
            alert(err.message)
        })
    }

    React.useEffect(() => {
        getTodoDetail();
    })

    return ( 
        <AppLayout>
            <form onSubmit={handleSubmit}>
                <Input 
                placeholder="name"
                className="my-3"
                defaultValue={todo.name}
                onChange={e => setName(e.target.value)}></Input>
                <Input 
                placeholder="description"
                className="my-3"
                defaultValue={todo.description}
                onChange={e => setDescription(e.target.value)}></Input>
                <Button type="submit">Submit</Button>
            </form>
            <div>
                <Typography variant="title" className="mb-5">{todo.name}</Typography>
                <Typography variant="body1">{todo.description}</Typography>
                <Button onClick={handleDelete} className='mt-5'>Delete</Button>
            </div>
        </AppLayout>
     );
}
 
export default TodoDetail;