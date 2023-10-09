

/** @odoo-module **/

import { patch } from '@web/core/utils/patch';
import { WorkEntryCalendarController } from '@hr_work_entry_contract/views/work_entry_calendar/work_entry_calendar_controller';
import { useWorkEntryPayslip } from '@hr_payroll/views/work_entry_calendar/work_entry_calendar_hook';

patch(WorkEntryCalendarController.prototype, 'hr_payroll.work_entries_calendar', {
    setup() {
        this._super(...arguments);
        this.onGeneratePayslips = useWorkEntryPayslip({
            getEmployeeIds: this.getEmployeeIds.bind(this),
            getRange: this.model.computeRange.bind(this.model),
        });
    },

    checkConflicts() {
        return Object.values(this.model.records).some(record => record.rawRecord.state === 'conflict') ? "disabled" : "";
    },

    getShowGeneratePayslipsButton() {
        debugger
        const allValidated = Object.values(this.model.records).every(record => record.rawRecord.state === 'validated');
        return !allValidated && Object.keys(this.model.records).length !== 0;
    },
});
