import {connect} from 'react-redux'

import ProjectListTable from "./project_list_table"


// export default connect(mapStateToProps,  mapDispatchToProps)(TopPage);
export default connect()(ProjectListTable);
