import React, { Dispatch, SetStateAction } from "react";

interface Props {
    pagination: {
        lastPage?: number,
    },
    setPageNumber: Dispatch<SetStateAction<number>>
}

const Pagination = ({
    pagination,
    setPageNumber
}: Props) => {
    const [pages, setPages] = React.useState<Array<number>>([]);

    const getPage = () => {
        if (pagination.lastPage !== undefined)
            for (let i = 1; i <= pagination?.lastPage; i++) {
                setPages((prev) => [...prev, i])
            }

            else setPages([])
    }

    React.useEffect(() => {
        getPage()
    }, [pagination.lastPage])

    return (
        <div className="btn-group">
            {
                pages.length !== 0 &&
                pages.map((page, index) => {
                    return (
                        <button onClick={() => { setPageNumber(page) }} key={index} className={`btn ${'btn-active'}`}>{page}</button>
                    )
                })
            }
        </div>
    );
}

export default Pagination;