import React from "react"
import NoticeList from "src/components/NoticeList"

const Aside: React.FC = (): JSX.Element => {
	return (
		<div className="aside">
			<NoticeList />
		</div>
	)
}
export default Aside