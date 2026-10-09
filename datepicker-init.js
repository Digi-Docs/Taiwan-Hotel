// Taiwan Hotel Mwanza — elegant date pickers (Flatpickr)
document.addEventListener("DOMContentLoaded", function () {
  if (typeof flatpickr === "undefined") return;

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  function syncField(el, iso) {
    // Always keep the real input's value in sync (belt-and-suspenders against
    // any altInput quirks), and mirror it into a linked hidden field if present.
    el.value = iso || "";
    var syncId = el.getAttribute("data-sync");
    if (syncId) {
      var target = document.getElementById(syncId);
      if (target) target.value = iso || "";
    }
  }

  document.querySelectorAll("[data-checkin-checkout]").forEach(function (group) {
    var inEl = group.querySelector('[data-role="checkin"]');
    var outEl = group.querySelector('[data-role="checkout"]');
    if (!inEl || !outEl) return;
    if (inEl._flatpickr || outEl._flatpickr) return;

    var outPicker = flatpickr(outEl, {
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d M Y",
      minDate: today,
      disableMobile: true,
      onChange: function (selectedDates, dateStr) {
        syncField(outEl, dateStr);
      },
    });

    var inPicker = flatpickr(inEl, {
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d M Y",
      minDate: today,
      disableMobile: true,
      onChange: function (selectedDates, dateStr) {
        syncField(inEl, dateStr);
        if (selectedDates[0]) {
          var next = new Date(selectedDates[0]);
          next.setDate(next.getDate() + 1);
          outPicker.set("minDate", next);
          if (outPicker.selectedDates[0] && outPicker.selectedDates[0] <= selectedDates[0]) {
            outPicker.setDate(next, true);
            syncField(outEl, outPicker.input.value);
          }
        }
      },
    });

    // Safety net: also sync on the form's submit event, in case a date was
    // picked without the onChange firing for any reason (e.g. programmatic set).
    var form = group.closest("form");
    if (form) {
      form.addEventListener("submit", function () {
        if (inPicker.selectedDates[0]) syncField(inEl, inPicker.input.value);
        if (outPicker.selectedDates[0]) syncField(outEl, outPicker.input.value);
      });
    }
  });

});
