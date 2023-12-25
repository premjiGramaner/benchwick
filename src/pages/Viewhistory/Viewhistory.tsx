import React, { useEffect, useState } from 'react'
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
import { userHistory } from 'src/reducers/userHistoryReducer'
import { useSelector } from 'react-redux'
import { IReducerState } from '@Interface/StoreInterface'
import { getEnvisionVariants } from 'src/reducers/getEnvisionVariantsReducer'
const Viewhistory: React.FC<IDefaultPageProps> = props => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [variationmodal, setvariationModal] = useState(false)
  const { data = [], isError } = useSelector(
    (state: IReducerState) => state.userHistoryReducer
  )
  const { variantData = {} } = useSelector(
    (state: IReducerState) => state.getEnvisionVariantsReducer
  )
  const [handlePageCount, setHandlePageCount] = useState<number>(10)

  const [tableData, setTableData] = useState(data || [])
  const [sortOrder, setSortOrder] = useState<string>('asc') // or 'desc'
  const [sortBy, setSortBy] = useState<string>('name')

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
      Object.values(item).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchInput.toLowerCase())
      )
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
                  key={index}
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

  return (
    <div className="viewhistory-page-main-container">
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
                  <th scope="col" onClick={() => sortHandle('name')}>
                    Name
                    <img
                      src={SortIcon}
                      style={{ cursor: 'pointer' }}
                      className={`sort-icon ${sortBy === 'name' ? 'active' : ''
                        }`}
                      alt=""
                      aria-hidden="true"
                    />
                  </th>
                  <th scope="col" onClick={() => sortHandle('created_date')}>
                    Date
                    <img
                      src={SortIcon}
                      style={{ cursor: 'pointer' }}
                      className={`sort-icon ${sortBy === 'name' ? 'active' : ''
                        }`}
                      alt=""
                      aria-hidden="true"
                    />
                  </th>
                  <th scope="col" onClick={() => sortHandle('created_time')}>
                    Time
                    <img
                      src={SortIcon}
                      style={{ cursor: 'pointer' }}
                      className={`sort-icon ${sortBy === 'name' ? 'active' : ''
                        }`}
                      alt=""
                      aria-hidden="true"
                    />
                  </th>
                  <th scope="col">Image</th>
                  <th scope="col" onClick={() => sortHandle('variants')}>
                    Saved Variation
                    <img
                      src={SortIcon}
                      style={{ cursor: 'pointer' }}
                      className={`sort-icon ${sortBy === 'name' ? 'active' : ''
                        }`}
                      alt=""
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
                    <tr key={index} className="body-style">
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
                        className="pointer"
                      >
                        <img className="eye-icon" src={icon} alt="eye image" />
                      </td>
                      <td>Action</td>
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
      <div
        className="modal mt-5"
        style={{ display: variationmodal ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="variation-modal-container">
            <div
              className="d-flex justify-content-between"
              id="varient-modal-label"
            >
              <div className="">
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
                variantData?.variant_list?.map(value => (
                  <div key={value.id + value.name}>
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
      </div>
    </div>
  )
}

export default Viewhistory
