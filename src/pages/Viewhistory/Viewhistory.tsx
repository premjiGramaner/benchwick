import React, { useEffect, useState } from 'react'
import HeaderSection from '@Components/HeaderSection/HeaderSection'
import SideBarSection from '@Components/SideBarSection/SideBarSection'
import { IDefaultPageProps } from '@Utils/interface/PagesInterface'
import { URLS } from '@Utils/constants'
import SearchBox from '@Components/SearchBox/SearchBox'
import {
  LeftArrowIcon,
  LeftArrowFirstIcon,
  RightArrowIcon,
  RightLastArrowIcon,
  CloseIcon,
  SortIcon,
} from '@Assets/images'
import icon from '../../assets/svg/fa-eye.svg'
import { useDispatch } from 'react-redux'
import { userHistory } from 'src/reducers/userHistoryReducer'
import { useSelector } from 'react-redux'
import {
  IGetEnvisionVariantsReducerState,
  IReducerState,
} from '@Interface/StoreInterface'
import { getEnvisionVariants } from 'src/reducers/getEnvisionVariantsReducer'
const Viewhistory: React.FC<IDefaultPageProps> = props => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [handlePageCount, setHandlePageCount] = useState<number>(10)
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [variationmodal, setvariationModal] = useState(false)
  const { data, isError } = useSelector(
    (state: IReducerState) => state.userHistoryReducer
  )
  const { variantData } = useSelector(
    (state: IReducerState) => state.getEnvisionVariantsReducer
  )
  // useEffect(() => {
  //   props.dispatch(actions.fetchViewhistoryRequested(`page=${selectedPage}`))
  // }, [selectedPage])
  const handleLogout = () => {
    // Do the logout API call and get the success result
    // localStorage.clear()
    props.navigate(URLS.LOGIN)
  }
  const handleBackToDashBoard = () => {
    props.navigate(URLS.DASHBOARD)
  }
  // const paginationRange = Array?.from(
  //   { length: edgeAppData?.edgeNodeDataList?.next?.totalPages },
  //   (_, i) => i + 1
  // )
  const paginationRange = Array?.from({ length: 10 }, (_, i) => i + 1)

  const onNext = () => {
    setSelectedPage(selectedPage + 1)

    // props.dispatch(
    //   fetchEdgeNodeApp(
    //     `next.pageSize=${handlePageCount}&next.pageNum=${selectedPage + 1}
    //     &deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${
    //       edgeNodeData?.edgeNodeInfo?.title
    //     }`
    //   )
    // )
  }

  const onPrevious = () => {
    setSelectedPage(selectedPage - 1)

    // props.dispatch(
    //   fetchEdgeNodeApp(
    //     `next.pageSize=${handlePageCount}&next.pageNum=${selectedPage - 1}
    //     &deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${
    //       edgeNodeData?.edgeNodeInfo?.title
    //     }`
    //   )
    // )
  }

  const onFirst = () => {
    setSelectedPage(1)
    // props.dispatch(
    //   fetchEdgeNodeApp(
    //     `next.pageSize=${handlePageCount}&next.pageNum=${1}&deviceName=${
    //       edgeAppData?.edgeNodeInfo?.title
    //     }
    //     &projectName=${edgeNodeData?.edgeNodeInfo?.title}`
    //   )
    // )
  }

  const onLast = () => {
    setSelectedPage(paginationRange.length)
    // props.dispatch(
    //   fetchEdgeNodeApp(
    //     `next.pageSize=${handlePageCount}&next.pageNum=${paginationRange.length}&deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
    //   )
    // )
  }
  const sortHandle = () => {
    console.log('sort is clicked')
  }
  const handleViewClick = (value, e) => {
    e.preventDefault()
    setvariationModal(!variationmodal)
    props.dispatch(getEnvisionVariants(value.id))
  }
  const handleVariationCancel = e => {
    // e.preventDefault()
    setvariationModal(!variationmodal)
  }
  const Pagination = () => {
    return (
      <div className="pt-2">
        <div className="pagination-wrapper d-flex justify-content-end align-items-center pt-3">
          <ul className={`pagination-container`}>
            <li
              className={`pagination-item ${selectedPage === 1 && 'pe-none'}`}
              onClick={onFirst}
              aria-hidden="true"
            >
              <img
                src={LeftArrowFirstIcon}
                className="pagination-nav-arrow"
                alt=""
              />
            </li>
            <li
              className={`pagination-item ${selectedPage === 1 && 'pe-none'}`}
              onClick={onPrevious}
              aria-hidden="true"
            >
              <img
                src={LeftArrowIcon}
                className="pagination-nav-arrow"
                alt=""
              />
            </li>
            {paginationRange.map((pageNumber: number, index) => {
              return (
                <li
                  className={`pagination-number ${
                    pageNumber === selectedPage && 'selected'
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedPage(pageNumber)
                    // props.dispatch(
                    //   fetchEdgeNodeApp(
                    //     `next.pageSize=${handlePageCount}&next.pageNum=${pageNumber}&deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
                    //   )
                    // )
                  }}
                  aria-hidden="true"
                >
                  {pageNumber}
                </li>
              )
            })}
            <li
              onClick={onNext}
              className={`${
                selectedPage === paginationRange.length && 'pe-none'
              }`}
              aria-hidden="true"
            >
              <img
                src={RightArrowIcon}
                className="pagination-nav-arrow"
                alt=""
              />
            </li>
            <li
              className={`pagination-item ${
                selectedPage === paginationRange.length && 'pe-none'
              }`}
              onClick={onLast}
              aria-hidden="true"
            >
              <img
                src={RightLastArrowIcon}
                className="pagination-nav-arrow"
                alt=""
              />
            </li>
          </ul>
          <input
            type="number"
            className="page-count mx-3"
            onBlur={event => {
              if (event.target.value !== '') {
                // props.dispatch(
                //   fetchEdgeNodeApp(
                //     `next.pageSize=${parseInt(
                //       event.target.value
                //     )}&next.pageNum=1&deviceName=${
                //       edgeAppData?.edgeNodeInfo?.title
                //     }
                //     &projectName=${edgeNodeData?.edgeNodeInfo?.title}`
                //   )
                // )
                setHandlePageCount(parseInt(event.target.value))
                setSelectedPage(1)
              }
            }}
          />
          <p className="pagination-total-count">{`${selectedPage}-${handlePageCount} of 30`}</p>
        </div>
      </div>
    )
  }
  useEffect(() => {
    props.dispatch(userHistory())
  }, [])
  return (
    <div className="viewhistory-page-main-container">
      <HeaderSection handleLogout={handleLogout} />
      <div className="d-flex">
        <SideBarSection enable={false} />
        <div className="history-table-container">
          <div className="d-flex justify-content-between">
            <button className="back-btn" onClick={handleBackToDashBoard}>
              Back to dashboard
            </button>
            <div className="d-flex  justify-content-between align-items-center searchContainer">
              <SearchBox
                {...props}
                icon="fa fa-search"
                handleChange={e => setSearchInput(e.target.value)}
              />
            </div>
          </div>

          <div>
            <table className="table">
              <thead>
                <tr className="head-style">
                  <th scope="col">
                    Name
                    <img
                      src={SortIcon}
                      className="sort-icon"
                      onClick={sortHandle}
                      alt=""
                      aria-hidden="true"
                    />
                  </th>
                  <th scope="col ">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Image</th>
                  <th scope="col">Saved Variation</th>
                  <th scope="col">View</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {data.map(value => {
                return (
                  <tbody>
                    <tr className="body-style">
                      <td>{value.name}</td>
                      <td>{value.created_date}</td>
                      <td>{value.created_time}</td>
                      <td>
                        <img
                          className="vimage-style"
                          src={value.original_url}
                          alt="original image"
                        />
                      </td>

                      <td>{value.variants}</td>
                      <td onClick={e => handleViewClick(value, e)}>
                        <img className="eye-icon" src={icon} alt="eye image" />
                      </td>
                      <td>Action</td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
          <div className="pb-5">
            <Pagination />
          </div>
        </div>
      </div>
      <div
        className="modal mt-5"
        style={{ display: variationmodal ? 'block' : 'none' }}
      >
        <div className="modal-dialog ">
          <div className="variation-modal-container">
            <div className="d-flex justify-content-between">
              <div className="">
                <div>
                  <h5
                    className="modal-title fs-12 fw-bold"
                    id="exampleModalLabel"
                  >
                    <u>SelectionName : {variantData.name}</u>
                  </h5>
                </div>
                <div className="d-flex">
                  <div className="fs-12">Number of variations :</div>
                  <div className="fs-12 fw-bold">{variantData.variants}</div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleVariationCancel}
                ></button>
              </div>
            </div>

            <div className="variation-modal mt-3">
              {variantData?.variant_list &&
                variantData?.variant_list.map(value => {
                  return (
                    <div>
                      <img
                        className="variation-style"
                        src={value.image_url}
                        alt="original image"
                      />
                    </div>
                  )
                })}
              ,
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewhistory
