const handleData = (data) => {
  try {
    const startNode = {
      title: "发起申请",
      status: "approved",
      name: res.name,
      endTime: res.startTime,
    };
    /* 审批进行时， 流程未结束 */
    if (_.eq(data.approvalStatus, "Y") && !data.ended) {
      // 正在审批的节点
      const _approving = _.map(
        _.slice(_.get(res, "taskList", null), -1),
        (item) => ({
          ...item,
          title: "审批人",
          status: ApproveFlowStatus.approving,
          statusName: "(审批中)",
        })
      );
      // 获取已审批的节点(踢掉最后一个节点)
      const _approved = _.size(_.dropRight(_.get(res, "taskList", null), 1))
        ? _.map(_.dropRight(_.get(res, "taskList", null), 1), (item) => ({
            ...item,
            title: "审批人",
            status: ApproveFlowStatus.approved,
            statusName: "(已同意)",
          }))
        : [];
      // 获取未审批的节点和抄送的节点
      const _notApproved = _.size(
        _.dropRight(_.get(res, "futureList", null), 1)
      )
        ? _.map(_.dropRight(_.get(res, "futureList", null), 1), (item) => ({
            ...item,
            name: _.eq(item.activityType, "taskCc")
              ? `${_.get(item, "properties.userName")}共${_.size(
                  _.split(_.get(item, "properties.userName"), ",")
                )}人`
              : item.activityName,
            taskId: item.assignee,
            title: _.eq(item.activityType, "taskCc") ? "抄送人" : "审批人",
            status: ApproveFlowStatus.notApproved,
            statusName: "",
          }))
        : [];
      // 下面顺序不能变
      return [startNode, ..._approved, ..._approving, ..._notApproved];
      /* 审批流程全部同意完成 */
    } else if (_.eq(data.approvalStatus, "Y") && data.ended) {
      // 成功审批(剔除最后一个不展示节点)(可能是成功的审批人，也有可能是成功的抄送人)
      const _approving = _.map(
        _.slice(_.dropRight(_.get(res, "taskList", null), 1), -1),
        (item) => ({
          ...item,
          name: _.eq(item.activityType, "taskCc")
            ? `${_.get(item, "properties.userName")}共${_.size(
                _.split(_.get(item, "properties.userName"), ",")
              )}人`
            : item.name,
          title: _.eq(item.activityType, "taskCc") ? "抄送人" : "审批人",
          status: ApproveFlowStatus.approved,
          statusName: _.eq(item["activityType"], "taskCc") ? "" : "(已同意)",
        })
      );
      // 已审批的节点(剔除最后两个不展示节点)
      const _approved = _.size(_.dropRight(_.get(res, "taskList", null), 2))
        ? _.map(_.dropRight(_.get(res, "taskList", null), 2), (item) => ({
            ...item,
            title: "审批人",
            status: ApproveFlowStatus.approved,
            statusName: "(已同意)",
          }))
        : [];
      // 下面顺序不能变
      return [startNode, ..._approved, ..._approving];
      /* 审批流程拒绝 */
    } else if (_.eq(data.approvalStatus, "N") && data.ended) {
      // 拒绝审批的节点(剔除最后一个不展示节点)
      const _approving = _.map(
        _.slice(_.dropRight(_.get(res, "taskList", null), 1), -1),
        (item) => ({
          ...item,
          name: item.name,
          title: "审批人",
          status: ApproveFlowStatus.approvalDenied,
          statusName: "(审批拒绝)",
        })
      );
      // 已审批的节点(剔除最后两个不展示节点)
      const _approved = _.size(_.dropRight(_.get(res, "taskList", null), 2))
        ? _.map(_.dropRight(_.get(res, "taskList", null), 2), (item) => ({
            ...item,
            title: "审批人",
            status: ApproveFlowStatus.approved,
            statusName: "(已同意)",
          }))
        : [];
      // 下面顺序不能变
      return [startNode, ..._approved, ..._approving];
    }
  } catch (err) {
    console.error(
      err,
      "当前审批流程出现错误请重新更改 src/models/approvalCenter.ts"
    );
  }
};
