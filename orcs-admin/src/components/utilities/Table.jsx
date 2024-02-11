import React, { useState, useEffect, Fragment } from "react";
import { Card } from "react-bootstrap";
import "rsuite/dist/rsuite.min.css";
import { Table, Pagination } from "rsuite";

const StyledTable = ({ title, loading, dataList, tableBody }) => {
  const [limit, setLimit] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(() => {
    setData(
      dataList.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
      })
    );
  }, [dataList]);

  return (
    <Fragment>
      <Card className="my-3">
        <h4 className="fs-22 font-w600">{title}</h4>
        <Table className="mt-4" height={550} data={data} loading={loading}>
          {tableBody}
        </Table>
        <div style={{ padding: 20 }}>
          <Pagination
            prev
            next
            first
            last
            maxButtons={4}
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            total={dataList.length}
            limitOptions={[15, 20]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default StyledTable;
