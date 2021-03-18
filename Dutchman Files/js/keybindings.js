function KeyPress(e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        undoit();
    }

    if (evtobj.keyCode == 89 && evtobj.ctrlKey) {
        redoit();
    }
}