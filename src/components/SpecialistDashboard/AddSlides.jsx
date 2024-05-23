import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, useContext } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import toast, { Toaster } from 'react-hot-toast';


import { GlobalContext } from '../../pages/Specialist/ManageCourses';
import Newcourse from './Newcourse';



export default function AddSlides({ newLesson, setNewLesson, setOpen, setIsEdit, allLessons, setAllLessons, slides }) {

    const editorRef = useRef(null);



    const [slideTitle, setSlideTitle] = useState('')
    const [content, setContent] = useState('');

    const [addedSlides, setAddedSlides] = useState(slides || [])
    const [newSlide, setNewSlide] = useState({ 'title': null, 'order': null, 'content': {} })


    console.log("slides :", addedSlides)


    const [selectedSlide, setSelectedSlide] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [createOpen, setCreateOpen] = useState(false)




    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            setContent(editorRef.current.getContent());
        }
    };
    //Dialogue Methodes 


    const handleTitleChange = (e) => {
        setSlideTitle(e.target.value)
    }

    const handleEditSlide = (slide) => {
        setSelectedSlide(slide);
        setIsEditing(true);
        setCreateOpen(true);
    };
    const handleUpdateSlide = () => {
        if (!slideTitle.trim()) {
            toast.error('Slide title cannot be empty');
            return;
        }

        const updatedSlides = addedSlides.map(slide => {
            if (slide.order === selectedSlide.order) {
                return {
                    ...slide,
                    title: slideTitle,
                    content: content
                };
            }
            setIsEditing(false)
            return slide;
        });

        setAddedSlides(updatedSlides);
        setCreateOpen(false);
        setIsEditing(false)
        setSelectedSlide(null);
    };


    const handleCreateSlide = () => {
        if (!slideTitle.trim()) {
            toast.error('Slide title cannot be empty');
            return;
        }

        setAddedSlides(prevSlides => [
            ...prevSlides,
            {
                ...newSlide,
                'title': slideTitle,
                'order': addedSlides.length + 1,
                'content': content
            }])
        setCreateOpen(false)
        setNewSlide({ 'title': null, 'content': {} })
    }




    const handleCancelSlide = () => {
        setSlideTitle(null)
        setCreateOpen(false)
        setNewSlide({ 'title': null, 'content': {} })
    }



    //Rest Methodes

    const handleAddSlide = () => {
        setCreateOpen(true)
    }

    const handleSave = () => {
        console.log(' imported :', slides)
        if (slides) {
            console.log('im in')
            console.log('allLessons : ', allLessons)
            // Update existing lesson
            const updatedLessons = allLessons.map(lesson => {

                console.log('lessons title : ', lesson.order)
                console.log('selected title :', newLesson.order)

                if (lesson.order === newLesson.order) {
                    return {
                        ...lesson,
                        slides: addedSlides
                    };
                }
                console.log('Lesson : ', lesson)
                return lesson;
            });

            console.log('updated lessons :', updatedLessons)

            setAllLessons(updatedLessons);
            setIsEdit(false)
            setOpen(false)
        } else {

            setAllLessons([...allLessons,
            {
                ...newLesson,
                ['slides']: [...newLesson.slides, ...addedSlides]
            }
            ])
            setIsEdit(false)
            setOpen(false)
        }
    }



    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(addedSlides);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);



        const updatedItems = items.map((item, index) => ({
            ...item,
            order: index + 1,
        }));

        setAddedSlides(updatedItems);
    };




    const handleDeleteSlide = (order) => {
        const updatedSlides = addedSlides.filter(slide => slide.order !== order);
        const reorderedLessons = updatedSlides.map((slide, index) => ({
            ...slide,
            order: index + 1,
        }));
        setAddedSlides(reorderedLessons);
        ;
    }



    return (
        <div className="head  w-[100%] flex flex-col gap-[30px] ">
            <div className='w-[100%] flex flex-col gap-[30px]'>


                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="addedSlides">
                        {(provided) => (
                            <div
                                className="lesson-list flex flex-col gap-[30px] justify-center items-center"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {addedSlides.sort((a, b) => a.order - b.order).map((slide, index) => (
                                    <Draggable key={index} draggableId={slide.order.toString()} index={index} >
                                        {(provided) => (
                                            <div
                                                className="lesson-item flex gap-[30px] justify-center items-center w-[100%]"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="flex w-[100%] h-[70px] px-[50px] text-[18px] justify-between items-center  font-[500] rounded-[10px] gap-[300px] bg-[#FFFFFC] hover:bg-[#FFF8B2] drop-shadow-md" key={index}>
                                                    <div>Slide {index + 1}:</div>
                                                    <div >{slide.title}</div>
                                                    <div className="flex justify-between items-centr w-[120px] ">
                                                    </div>
                                                </div>
                                                <button type='button' onClick={() => { handleEditSlide(addedSlides[index]) }} className="flex items-center justify-center px-[20px] py-[20px] w-[70px] h-[70px] bg-[#FFFFFC] hover:bg-[#FFF8B2] drop-shadow-md text-[#3D3700] text-[16px] font-medium rounded-[8px]  " >
                                                    <FontAwesomeIcon size="lg" icon={faPenToSquare} />
                                                </button>
                                                <button type='button' onClick={() => { handleDeleteSlide(slide.order) }} className="flex items-center justify-center px-[20px] py-[20px] w-[70px] h-[70px] bg-[#FFFFFC] hover:bg-[#FFF8B2] drop-shadow-md text-[#3D3700] text-[16px] font-medium rounded-[8px] " >
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



                <button onClick={handleAddSlide} type='button' className="flex justify-center items-center w-[100%] h-[70px]  gap-[20px]  bg-[#FCEE65] hover:bg-[#FAE200] text-[18px] font-[500] rounded-[10px]">
                    <FontAwesomeIcon size="lg" icon={faPlus} />
                    Add Slide
                </button>
            </div>
            <div className='flex justify-end items-center gap-[30px]'>
                <button className="flex justify-center items-center w-[100px] h-[50px] rounded-[5px] text-[18px] bg-[#FFF8B2] hover:bg-[#FCEE65] " type="button" >Cancel</button>
                <button onClick={handleSave} className="flex justify-center items-center w-[100px] h-[50px] rounded-[5px] text-[18px] bg-[#FCEE65] hover:bg-[#FAE200]" type="button">{slides ? 'Update' : 'Save'}</button>
            </div>

            {
                createOpen &&
                <Dialog
                    open={createOpen}
                    onClose={() => { setCreateOpen(false) }}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth='2xl'
                    PaperProps={{
                        sx: {
                            height: '100vh',
                            padding: '10px',
                            backgroundColor: '#FFFDE8',
                            borderRadius: '10px',

                        }
                    }}

                    disableEnforceFocus
                >
                    <DialogTitle id="form-dialog-title" sx={{ color: '#3D3700' }} >
                        {isEditing ? 'Edit Slide' : 'Create Slide'}
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px'
                        }}
                    >
                        <label htmlFor="title" className="flex flex-col gap-[10px]">
                            <h1 style={{ fontSize: '22px' }}> * Slide Title</h1>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                type="text"
                                maxWidth="xl"
                                fullWidth

                                variant="outlined"
                                className='h-[50px] w-full'
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
                                }}
                                defaultValue={isEditing ? selectedSlide.title : ''}
                                onChange={handleTitleChange}

                            />
                        </label>

                        <label htmlFor="editor" style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
                            <h1 style={{ fontSize: '22px' }}> * Slide Content</h1>
                            <Editor
                                onChange={log}
                                apiKey='k8ji8lfdt114n6q7kyf7hbryo06kdmy8edjf23huxnqxe8ji'
                                onInit={(_evt, editor) => editorRef.current = editor}
                                init={{
                                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                        { value: 'First.Name', title: 'First Name' },
                                        { value: 'Email', title: 'Email' },
                                    ],
                                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                }}
                                initialValue="Welcome to TinyMCE!"
                            />


                        </label>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleCancelSlide();
                            setIsEditing(false);
                        }} sx={{
                            backgroundColor: '#FFF8B2', color: '#3D3700',
                            '&:hover': {
                                backgroundColor: '#FCEE65',
                            },
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={isEditing ? handleUpdateSlide : handleCreateSlide} sx={{
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

    )
}