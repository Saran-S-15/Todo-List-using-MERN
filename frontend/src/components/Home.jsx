import React, { useEffect, useState } from 'react'
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useFormik } from 'formik';
import { Checkbox } from "@material-tailwind/react";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function Home() {
  const [lists, setLists] = useState([]);
  const [update, setUpdate] = useState(false);
  const [listId, setListId] = useState(null);
  const [checked, setChecked] = useState({});

  const formik = useFormik({
    initialValues: {
      Todo: ""
    },
    onSubmit: async (values) => {
      try {
        if (update) {
          await axios.put(`http://localhost:4000/api/todo/edit/${listId}`, values);
          setUpdate(false);
          setListId(null);
        }
        else {
          await axios.post("http://localhost:4000/api/todo/create", values);
        }
        fetchLists();
        formik.resetForm();
      } catch (error) {
        alert(`Something went Wrong, ${error}`);
      }
    }
  })

  const fetchLists = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/todo/fetch");
      setLists(response.data);
    } catch (error) {
      alert(`Something went Wrong, ${error}`);
    }
  }

  useEffect(() => {
    fetchLists();
  }, [])

  const handleDelete = async (list) => {
    try {
      await axios.delete(`http://localhost:4000/api/todo/delete/${list._id}`);
      fetchLists();
    } catch (error) {
      alert(`Something went Wrong in Deleting, ${error}`);
    }
  }

  const handleEdit = (list) => {
    formik.setValues(list);
    setUpdate(true);
    setListId(list._id)
  }

  const handleCheckboxChange = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  return (
    <div className='grid grid-cols-1 md:mx-[100px] sm:mx-[100px] lg:mx-[400px]'>
      <form onSubmit={formik.handleSubmit}>
        <h1 className='text-3xl font-bold text-center mt-5 mb-5'>Todo List</h1>
        <Input label="Create an Todo List" id="Todo" name="Todo" onChange={formik.handleChange} value={formik.values.Todo} />
        <Button type='submit' className='mt-3'>{update ? "Update" : "Add"}</Button>
      </form>
      {
        lists.map((list) => {
          return <div key={list._id} className='mt-3 flex bg-yellow-500 text-white p-3 rounded-md'>
            <Checkbox onClick={() => handleCheckboxChange(list._id)} />
            <span className={`text-black mt-2 text-1xl ${checked[list._id] ? 'line-through' : ''}`}>
              {list.Todo}
            </span>
            <MdDelete size={25} className='ms-auto cursor-pointer mt-3' color='black' onClick={() => handleDelete(list)} />
            <MdEdit size={25} className='cursor-pointer mt-3 ms-2' color='black' onClick={() => handleEdit(list)} />
          </div>
        })
      }
    </div>
  )
}

export default Home;