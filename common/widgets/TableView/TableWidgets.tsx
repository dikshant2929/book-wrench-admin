import React from 'react';
const TableWidgets = (props: any) => {
  return (
      <>
          <div className="flex justify-end gap-4">
              {React.Children.count(props.children) > 0 ? props.children : null}
          </div>
      </>
  );
};
export default TableWidgets;