import { Checkbox } from "react-daisyui";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Input from "../../components/Input/Input";
import AppLayout from "../../components/layout/AppLayout";
import Typography from "../../components/Typography/Typography";
import React from "react";
import axios from "axios";

const SearchPage = () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [results, setResults] = React.useState([]);

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        let userData = JSON.parse(window.localStorage.getItem('Authorization') || "")

        axios.get(`http://localhost:3333/api/partner/search?q=${searchValue}`, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
        .then((res) => {
            console.log(res);
            setResults(res.data.data)
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <AppLayout>
            <FilterBar />
            <div className="w-full min-h-screen pl-[260px] pt-5">
                <form onSubmit={handleSearch}>
                <Input onChange={e => setSearchValue(e.target.value)} label="Search" placeholder="search for name or companies" />
                </form>
                <div className="mt-10 p-5  min-h-[400px]">
                    {/* <Typography variant="paragraph" className="mb-10">12 results</Typography> */}
                    <div className="flex flex-wrap ">
                        {
                            results.length !== 0 ?
                            results.map((result, index) => {
                                return(
                                    <ResultCard isliked />
                                )
                            })
                            :
                            <div className="w-full flex justify-center flex-col items-center">
                                <img className="w-[250px]" src="/images/search/not_found.png" alt="hero"></img>
                                <Typography variant="subtitle2" className="mt-10">Cari mitra favorit anda di sini</Typography>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

const FilterBar = () => {
    return (
        <div className="md:min-w-[20%] p-4 border min-h-screen fixed top-[87px] bg-white overflow-y-scroll bottom-0 pb-20">
            <div className="flex items-center justify-between">
                <Typography className="font-semibold">Filter by</Typography>
                <Typography className="text-purple-600">Reset filters</Typography>
            </div>
            <hr className="my-5" />
            <div className="food my-5">
                <Typography className="text-gray-400 font-semibold mb-3">Food</Typography>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Cheap</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Gourmet</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Seafood</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Regional Cuisine</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Various</Typography>
                </div>
            </div>
            <div className="food my-5">
                <Typography className="text-gray-400 font-semibold mb-3">Society</Typography>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Architecture</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Art & culture</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">History</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Museums</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Various</Typography>
                </div>
            </div>
            <div className="food my-5">
                <Typography className="text-gray-400 font-semibold mb-3">Food</Typography>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Cheap</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Gourmet</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Seafood</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Regional Cuisine</Typography>
                </div>
                <div className="flex items-center my-3">
                    <Checkbox size="sm" className="mr-2" />
                    <Typography className="font-[500] text-sm">Various</Typography>
                </div>
            </div>
        </div>
    )
}

interface Props {
    nama: string,
    deskripsi: string,
    alamat: string,
    sop: string
}

const ResultCard = ({ isliked } : { isliked?: boolean }) => {
    const [liked, setLiked] = React.useState(isliked);
    return (
        <div className="border md:w-[47%] p-5 bg-white m-2 relative hover:shadow-lg transition duration-200 cursor-pointer">
            <div className="flex items-center">
                <img className="w-12 h-12" src="https://images.unsplash.com/photo-1547537352-ae90c682877e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="img" />
                <Typography variant="subtitle2" className=" ml-2">O'ahu <span>Hawaiian Island</span></Typography>
            </div>
            <Typography variant="paragraph" className="my-5">O'ahu is home to the capital city on Honolulu. The island is known for its diverse landscape, including colorful beaches and lush rainforest</Typography>
            <div>
                <div className={`absolute top-5 right-5 `}>
                    {
                        liked ? 
                        <AiFillHeart size={25} className="fill-red-400"/>
                        :
                        <AiOutlineHeart size={25}/>
                    }
                </div>
                {/* <Button className="mr-5">Show Details</Button>
                <Button endIcon={<AiOutlineHeart size="20px"/>}>Favorites</Button> */}
            </div>
        </div>
    )
}

export default SearchPage;