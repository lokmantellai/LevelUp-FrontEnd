import { useState, useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

import AddSlides from "./AddSlides";
import { GlobalContext } from '../../pages/Specialist/ManageCourses';
import { all } from "axios";
import toast, { Toaster } from 'react-hot-toast';


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export default function Step2({ isEdit, setIsEdit, allLessons, setAllLessons }) {




    const [title, setTitle] = useState('')
    const [lesson, setLesson] = useState({ 'title': null, 'order': null, 'slides': [] })
    const [createOpen, setCreateOpen] = useState(false)
    const [lessonSlidesOpen, setLessonSlidesOpen] = useState(false)

    const [selectedLesson, setSelectedLesson] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const [passed, setPassed] = useState()




    console.log('allLessons : ', allLessons)


    const handleTitleChange = (e) => {
        setTitle(e.target.value)

    }


    // Delete Lesson

    const handleDeleteLesson = (order) => {
        const updatedLessons = allLessons.filter(lesson => lesson.order !== order);
        const reorderedLessons = updatedLessons.map((lesson, index) => ({
            ...lesson,
            order: index + 1,
        }));
        setAllLessons(reorderedLessons);
    };

    // Create Lesson


    const handleCreateLesson = () => {
        if (!title.trim()) {
            toast.error('Lesson title is required.');
            return;
        }
        setLesson({
            ...lesson,
            'order': allLessons.length + 1,
            'title': title,
            'description': 'eeeee'
        })
        setIsEdit(true)
        setLessonSlidesOpen(true)
        setCreateOpen(false)
        setPassed(null)
    }

    // Cancel Lesson

    const handleCancelLesson = () => {
        setTitle(null)
        setCreateOpen(false)
        setIsEditing(false)
        setSelectedLesson(null)
    }


    // Drag & Drop 

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(allLessons);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);



        const updatedItems = items.map((item, index) => ({
            ...item,
            order: index + 1,
        }));
        setAllLessons(updatedItems);
    };


    // Edit Lesson

    const handleEditLesson = (lesson) => {
        setSelectedLesson(lesson);
        setTitle(lesson.title);
        setIsEditing(true);
        setCreateOpen(true);
    };

    // Update Lesson

    const handleUpdateLesson = () => {
        if (!title.trim()) {
            toast.error('Lesson title is required.');
            return;
        }
        const updatedLessons = allLessons.map(l => {
            console.log("lesson", l)
            if (l.order === selectedLesson.order) {
                return {
                    ...l,
                    title: title
                };
            }
            return l;

        });

        console.log('updated Lessons :', updatedLessons)
        setPassed(selectedLesson.slides);
        setAllLessons(updatedLessons);
        setCreateOpen(false);
        setIsEdit(true)
        setIsEditing(false);
        setSelectedLesson(null);
        setLessonSlidesOpen(true);
    };




    return (
        <div className="bighead w-[100%]">

            {!isEdit &&
                <div className="head  w-[100%] h-[100%] flex flex-col gap-[30px] ">

                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="lessons">
                            {(provided) => (
                                <div
                                    className="lesson-list flex flex-col gap-[30px] justify-center items-center"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {allLessons.sort((a, b) => a.order - b.order).map((lesson, index) => (
                                        <Draggable key={index} draggableId={lesson.order.toString()} index={index} >
                                            {(provided) => (
                                                <div
                                                    className="lesson-item flex gap-[30px] justify-center items-center w-[100%]"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <div className="flex w-[100%] h-[70px] px-[50px] text-[18px] justify-between items-center  font-[500] rounded-[10px] gap-[300px] bg-[#FFFFFC] hover:bg-[#FFF8B2] drop-shadow-md" key={index}>
                                                        <div>Lesson {index + 1}:</div>
                                                        <div >{lesson.title}</div>
                                                        <div className="flex justify-between items-centr w-[120px] ">
                                                        </div>
                                                    </div>
                                                    <button type="button" onClick={() => handleEditLesson(lesson)} className="flex items-center justify-center px-[20px] py-[20px] w-[70px] h-[70px] bg-[#FFFFFC] hover:bg-[#FFF8B2] drop-shadow-md text-[#3D3700] text-[16px] font-medium rounded-[8px]  " >
                                                        <FontAwesomeIcon size="lg" icon={faPenToSquare} />
                                                    </button>
                                                    <button type="button" onClick={() => handleDeleteLesson(lesson.order)} className="flex items-center justify-center px-[20px] py-[20px] w-[70px] h-[70px] bg-[#FFFFFC] hover:bg-[#FFF8B2] drop-shadow-md text-[#3D3700] text-[16px] font-medium rounded-[8px] " >
                                                        <FontAwesomeIcon size="lg" icon={faTrash} />
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>






                    <button onClick={() => { setCreateOpen(true); }} type="button" className="flex justify-center items-center w-[100%] h-[70px]  gap-[20px]  bg-[#FCEE65] hover:bg-[#FAE200] text-[18px] font-[500] rounded-[10px]">
                        <FontAwesomeIcon size="lg" icon={faPlus} />
                        Add New Lesson
                    </button>
                    {
                        createOpen &&
                        <Dialog
                            open={createOpen}
                            onClose={() => { setCreateOpen(false); setIsEditing(false); setSelectedLesson(null); }}
                            aria-labelledby="form-dialog-title"
                            PaperProps={{
                                sx: {
                                    padding: '10px',
                                    backgroundColor: '#FFFDE8',
                                    borderRadius: '10px'
                                }
                            }}
                        >
                            <DialogTitle id="form-dialog-title" sx={{ color: '#3D3700' }} >
                                {isEditing ? 'Edit Lesson' : 'Create Lesson'}
                            </DialogTitle>
                            <DialogContent>
                                <label htmlFor="title" className="flex flex-col gap-[10px]">
                                    <h1 style={{ fontSize: '22px' }}> * Lesson Title</h1>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="title"
                                        type="text"
                                        defaultValue={isEditing ? title : ''}
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: '#FFFFFC',
                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'transparent',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#3D3700',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#3D3700',
                                                },
                                            },
                                            width: '500px',
                                            height: '50px'
                                        }}

                                        onChange={handleTitleChange}

                                    />
                                </label>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCancelLesson} sx={{
                                    backgroundColor: '#FFF8B2', color: '#3D3700',
                                    '&:hover': {
                                        backgroundColor: '#FCEE65',
                                    },
                                }}>
                                    Cancel
                                </Button>
                                <Button onClick={isEditing ? handleUpdateLesson : handleCreateLesson} sx={{
                                    backgroundColor: '#FFF8B2', color: '#3D3700',
                                    '&:hover': {
                                        backgroundColor: '#FCEE65',
                                    },
                                }}>
                                    {isEditing ? 'Update' : 'Create'}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    }
                </div >
            }
            {lessonSlidesOpen && <AddSlides newLesson={lesson} setNewLesson={setLesson} setOpen={setLessonSlidesOpen} setIsEdit={setIsEdit} allLessons={allLessons} setAllLessons={setAllLessons} slides={passed} />}
        </div >
    )

}