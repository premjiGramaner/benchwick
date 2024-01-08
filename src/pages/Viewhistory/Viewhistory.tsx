import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SideBarSection from '@Components/SideBarSection/SideBarSection'
import { IDefaultPageProps } from '@Utils/interface/PagesInterface'
import { API_URL, URLS } from '@Utils/constants'
import SearchBox from '@Components/SearchBox/SearchBox'
import {
  LeftArrowIcon,
  LeftArrowFirstIcon,
  RightArrowIcon,
  RightLastArrowIcon,
  SortIcon,
} from '@Assets/images'
import icon from '../../assets/svg/fa-eye.svg'
import { userHistory, deleteHistory } from '@Reducers/userHistoryReducer'

import { IReducerState } from '@Interface/StoreInterface'
import { getEnvisionVariants } from '@Reducers/getEnvisionVariantsReducer'
import { getKey } from '@Utils/utils'

const Viewhistory: React.FC<IDefaultPageProps> = props => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [variationmodal, setvariationModal] = useState(false)

  const [handlePageCount, setHandlePageCount] = useState<number>(10)
  const [deleteModal, setDeleteModal] = useState<number>(0)

  const [sortOrder, setSortOrder] = useState<string>('asc') // or 'desc'
  const [sortBy, setSortBy] = useState<string>('name')

  const { data = [], isError } = useSelector(
    (state: IReducerState) => state.userHistoryReducer
  )

  const [tableData, setTableData] = useState(data || [])
  const { variantData = {} } = useSelector((state: IReducerState) => state.getEnvisionVariantsReducer)
  const { userInfo } = useSelector((state: IReducerState) => state.loginReducer)

  useEffect(() => {
    setTableData(data || [])
  }, [data]);

  const sortHandle = field => {
    const isDateOrTime = ['created_date', 'created_time'].includes(field)
    const isNumeric = field === 'variants'

    let sortedData = [...tableData]
    sortedData = sortedData.sort((a, b) => {
      if (isDateOrTime) {
        const dateA = new Date(a[field])
        const dateB = new Date(b[field])
        const compareValue = dateA > dateB ? 1 : -1
        return sortOrder === 'asc' ? compareValue : -compareValue
      }

      if (isNumeric) {
        const compareValue = a[field] - b[field]
        return sortOrder === 'asc' ? compareValue : -compareValue
      }

      const compareValue = a[field].localeCompare(b[field])
      return sortOrder === 'asc' ? compareValue : -compareValue
    })

    setTableData(sortedData)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    setSortBy(field)
  }

  const filteredAndSortedData = tableData
    .filter(item =>
      item.name.toLowerCase().lastIndexOf(searchInput.toLowerCase()) > -1 ||
      item.image_name.toLowerCase().lastIndexOf(searchInput.toLowerCase()) > -1 ||
      item.variants.toString().toLowerCase().lastIndexOf(searchInput.toLowerCase()) > -1
    )
    .sort((a, b) => {
      if (sortBy === 'date' || sortBy === 'time' || sortBy === 'variants') {
        const isDateOrTime = ['created_date', 'created_time'].includes(sortBy)
        const isNumeric = sortBy === 'variants'

        if (isDateOrTime) {
          const dateA = new Date(a[sortBy])
          const dateB = new Date(b[sortBy])
          const compareValue = dateA > dateB ? 1 : -1
          return sortOrder === 'asc' ? compareValue : -compareValue
        }

        if (isNumeric) {
          const compareValue = a[sortBy] - b[sortBy]
          return sortOrder === 'asc' ? compareValue : -compareValue
        }
      }
      const compareValue = a[sortBy].localeCompare(b[sortBy])
      return sortOrder === 'asc' ? compareValue : -compareValue
    })

  const startIndex = (selectedPage - 1) * handlePageCount
  const endIndex = startIndex + handlePageCount
  const currentDataPage = filteredAndSortedData.slice(startIndex, endIndex)

  const handleBackToDashBoard = () => {
    props.navigate(URLS.DASHBOARD)
  }

  const totalItems = filteredAndSortedData.length
  const totalPages = Math.ceil(totalItems / handlePageCount)

  const paginationRange =
    Array.from({ length: totalPages }, (_, i) => i + 1) || []

  const onFirst = () => setSelectedPage(1)
  const onPrevious = () => {
    if (selectedPage > 1) setSelectedPage(selectedPage - 1)
  }

  const onNext = () => {
    if (selectedPage < Math.ceil(filteredAndSortedData.length / handlePageCount)) {
      setSelectedPage(selectedPage + 1)
    }
  }

  const onLast = () => {
    setSelectedPage(Math.ceil(filteredAndSortedData.length / handlePageCount))
  }

  const handleViewClick = (value, e) => {
    e.preventDefault()
    setvariationModal(!variationmodal)
    props.dispatch(getEnvisionVariants(value.id))
  }

  const handleVariationCancel = e => {
    e.preventDefault()
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
                  className={`pagination-number ${pageNumber === selectedPage && 'selected'}`}
                  key={getKey()}
                  onClick={() => {
                    setSelectedPage(pageNumber)
                  }}
                  aria-hidden="true"
                >
                  {pageNumber}
                </li>
              )
            })}
            <li
              onClick={onNext}
              className={`${selectedPage === paginationRange.length && 'pe-none'}`}
              aria-hidden="true"
            >
              <img
                src={RightArrowIcon}
                className="pagination-nav-arrow"
                alt=""
              />
            </li>
            <li
              className={`pagination-item ${selectedPage === paginationRange.length && 'pe-none'}`}
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
                setHandlePageCount(parseInt(event.target.value))
                setSelectedPage(1)
              }
            }}
          />
          <p className="pagination-total-count">{`${selectedPage} - ${totalPages} of ${totalItems}`}</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    props.dispatch(userHistory())
  }, [])

  const onDeleteItem = (id: number) => {
    props.dispatch(deleteHistory(id))
    setDeleteModal(0)
  }

  const isAdmin = userInfo?.role === 'admin';
  return (
    <div className="viewhistory-page-main-container">
      <div className="d-flex">
        <SideBarSection enable={false} {...props} />
        <div className="history-table-container">
          <div className="d-flex justify-content-between">
            <button className="back-btn" onClick={handleBackToDashBoard}>
              Back to dashboard
            </button>
            <div className="d-flex  justify-content-between align-items-center searchContainer">
              <SearchBox handlechange={e => setSearchInput(String(e.target.value))} />
            </div>
          </div>

          <div>
            <table className="table">
              <thead>
                <tr className="head-style">
                  <th scope="col" onClick={() => sortHandle('name')}>
                    Name
                    <img
                      src={SortIcon}
                      className={`sort-icon pointer ${sortBy === 'name' ? 'active' : ''}`}
                      alt="sort-icon"
                      aria-hidden="true"
                    />
                  </th>
                  <th scope="col" onClick={() => sortHandle('created_date')}>
                    Date
                    <img
                      src={SortIcon}
                      className={`sort-icon pointer ${sortBy === 'created_date' ? 'active' : ''}`}
                      alt="sort-icon"
                      aria-hidden="true"
                    />
                  </th>
                  <th scope="col" onClick={() => sortHandle('created_time')}>
                    Time
                    <img
                      src={SortIcon}
                      className={`sort-icon pointer ${sortBy === 'created_time' ? 'active' : ''}`}
                      alt="sort-icon"
                      aria-hidden="true"
                    />
                  </th>
                  <th scope="col">Image</th>
                  <th scope="col" onClick={() => sortHandle('variants')}>
                    Saved Variation
                    <img
                      src={SortIcon}
                      className={`sort-icon pointer ${sortBy === 'variants' ? 'active' : ''}`}
                      alt="sort-icon"
                      aria-hidden="true"
                    />
                  </th>
                  <th scope="col">View</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {!!currentDataPage &&
                  currentDataPage?.map((value, index) => (
                    <tr key={getKey()} className="body-style">
                      <td>{value.name}</td>
                      <td>{value.created_date}</td>
                      <td>{value.created_time}</td>
                      <td>
                        <img
                          className="vimage-style"
                          src={`${API_URL.host}/${value.original_url}`}
                          alt="original image"
                        />
                      </td>

                      <td>{value.variants}</td>
                      <td
                        onClick={e => handleViewClick(value, e)}
                        className="pointer pl-35"
                      >
                        <img className="eye-icon" src={icon} alt="eye image" />
                      </td>
                      {isAdmin && <td>{value.isActive === 'true' ? 'Active' : 'In Active'}</td>}
                      {!isAdmin && <td className='display-td-center'>
                        <span className="glyphicon glyphicon-trash" onClick={() => setDeleteModal(value.id)}></span>
                      </td>}
                    </tr>
                  ))}
                {currentDataPage?.length === 0 && (
                  <tr className="body-style">
                    <td colSpan={7} className="no-data-found">
                      No Data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pb-5">
            <Pagination />
          </div>
        </div>
      </div>

      {variationmodal && <div
        className="modal mt-5 animate__animated animate__fadeIn"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-lg">
          <div className="variation-modal-container">
            <div
              className="d-flex justify-content-between"
              id="varient-modal-label"
            >
              <div>
                <div>
                  <h4 className="modal-title fs-12 fw-bold">
                    <u>SelectionName : {variantData?.name}</u>
                  </h4>
                </div>
                <div className="d-flex f14">
                  <div className="fs-12">Number of variations :</div>
                  <div className="fs-12 fw-bold">{variantData?.variants}</div>
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
              {variantData?.variant_list?.length &&
                variantData?.variant_list?.map((value, index) => (
                  <div key={getKey()}>
                    <div className="variation-image-index-circle">
                      <span>{index + 1}</span>
                    </div>
                    <img
                      className="variation-style"
                      src={`${API_URL.host}/${value.image_url}`}
                      alt="original image"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>}

      {deleteModal && <div className="modal delete-confirm-modal animate__animated animate__fadeIn">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Confirm Delete</h4>
              <button type="button" className="close" onClick={() => setDeleteModal(0)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure want to delete?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={() => setDeleteModal(0)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => onDeleteItem(deleteModal)}>Confirm</button>
            </div>
          </div>
        </div>
      </div>}

    </div>
  )
}

export default Viewhistory
