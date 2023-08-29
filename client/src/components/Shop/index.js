import React, { useState, useEffect, useReducer } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { productsByPaginate } from "store/actions/products.actions";
import { getAllBrands } from "store/actions/brands.action";

import CardBlock from 'utils/products/card.blocks';
import PaginateNav from 'utils/PaginateNav';
import SearchBar from "./SearchBar"
import CollapseCheckBox from './CollapseCheckBox';
import RangeSelect from './RangeSelect';

import GridOffIcon from '@mui/icons-material/GridOff';
import GridOnIcon from '@mui/icons-material/GridOn';

const defaultValues = {
    keywords: "",
    brand: [],
    min: 0,
    max: 100000,
    frets: [],
    page: 1
}

export default function Shop() {
    const [grid, setGrid] = useState(false);
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    );
    const { byPaginate } = useSelector(state => state.products)

    // console.log(byPaginate.docs);

    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch]);

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [searchValues, dispatch]);

    const handleGrid = () => {
        setGrid(!grid)
    }

    const goToPage = (page) => {
        // console.log(page);
        setSearchValues({ page: page });
    };

    const handleResetSearch = () => {
        setSearchValues({ keywords: "" });
    };

    const handleKeywords = (values) => {
        setSearchValues({ keywords: values })
    }

    const handleFilters = (filters, category) => {
        if (category === "brand") {
            setSearchValues({ brand: filters, page: 1 })
        }
        if (category === "frets") {
            setSearchValues({ frets: filters, page: 1 })
        }
    }

    const handleRange = (values) => {
        setSearchValues({ min: values.min, max: values.max, page: 1 });
    }


    return (
        <div className='page_container'>
            <div className='page_top'>
                <div className='container'>
                    <SearchBar
                        handleKeywords={(values) => handleKeywords(values)}
                    />

                </div>
            </div>
            <div className='container'>
                <div className='shop_wrapper'>
                    <div className='left'>
                        <CollapseCheckBox
                            initState={true}
                            title="Brands"
                            list={brands.all}
                            handleFilters={(filters) => handleFilters(filters, "brand")}
                        />
                        <CollapseCheckBox
                            initState={false}
                            title="Frets"
                            list={[
                                { _id: 20, name: 20 },
                                { _id: 21, name: 21 },
                                { _id: 22, name: 22 },
                                { _id: 24, name: 24 }
                            ]}
                            handleFilters={(filters) => handleFilters(filters, "frets")}
                        />
                        <RangeSelect
                            title="Range select"
                            handleRange={(values) => handleRange(values)} />
                    </div>
                    <div className='right'>
                        <div className='shop_options'>
                            <div className='shop_grids clear'>
                                <div className={`grid_btn ${grid ? "" : "active"}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOnIcon />
                                </div>
                                <div className={`grid_btn ${!grid ? "" : "active"}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOffIcon />
                                </div>
                            </div>
                            <div>
                                {byPaginate && byPaginate.docs ?
                                    <>
                                        <CardBlock
                                            grid={grid}
                                            items={byPaginate.docs}
                                            shop={true}
                                        />
                                        <PaginateNav
                                            prods={byPaginate}
                                            prev={(page) => goToPage(page)}
                                            next={(page) => goToPage(page)}
                                            resetSearch={() => handleResetSearch()}
                                        />
                                    </>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
