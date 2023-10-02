function exportTableToExcel() {
    const table = document.getElementById("dataTable2");
    const ws = XLSX.utils.table_to_sheet(table);

    // Create a new workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Table Data");

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "table_data.xlsx");
}
function filterTable() {
const searchInput = document.getElementById("searchInput");
const filterText = searchInput.value.trim().toUpperCase();
const table = document.getElementById("dataTable2");
const rows = table.getElementsByTagName("tr");

for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip header row
    const cells = rows[i].getElementsByTagName("td");
    let matchFound = false;

    // Only search in the first column (MPL_ID)
    const mplIdText = cells[0].textContent || cells[0].innerText;

    // Check if the text contains the filter text in MPL_ID column
    if (mplIdText.toUpperCase().includes(filterText)) {
        matchFound = true;
    }

    // If a match is found in the first column, show the entire row
    if (matchFound) {
        rows[i].style.display = "";
    } else {
        rows[i].style.display = "none";
    }
}
};

// Call the function to load table data when the page loads
window.addEventListener("load", loadTableData);

// Add an event listener to the search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", filterTable);

          function loadTableData() {
    // Define the URL for the GET request
    const apiUrl2 = 'https://5a08ba10trial-dev-apptemplate-srv.cfapps.us10-001.hana.ondemand.com/catalog/MPL';

    // Fetch data using the GET request
    fetch(apiUrl2, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('dataBody2'); // Updated table body ID
            tableBody.innerHTML = ''; // Clear existing rows

            if (data.value && Array.isArray(data.value)) {
                data.value.forEach(item => {
                    const mplId = item.MPLId;
                    const stepName = item.StepName;
                    const headers = item.Headers;
                    const properties = item.Properties;
                    const body = item.Body;

// Create a new table row and cells
const row = document.createElement('tr');
const mplIdCell = document.createElement('td');
const stepNameCell = document.createElement('td');
const headersCell = document.createElement('td');
const propertiesCell = document.createElement('td');
const bodyCell = document.createElement('td');

// Set cell values
mplIdCell.textContent = mplId;
stepNameCell.textContent = stepName;
bodyCell.textContent = body;

// Function to split values using a regex pattern
function splitValues(value) {
    const regex = /(?:\[.*?\]|[^;]+)(?=;|$)/g;
    return value.match(regex) || [];
}

// Split and create lines for Headers
const headersValues = splitValues(headers);
headersValues.forEach(headerValue => {
    // Create a new line break element
    const lineBreak = document.createElement('br');
    headersCell.appendChild(lineBreak); // Add line break
    headersCell.appendChild(document.createTextNode(headerValue.trim())); // Add header value
});

// Split and create lines for Properties
const propertiesValues = splitValues(properties);
propertiesValues.forEach(propertyValue => {
    // Create a new line break element
    const lineBreak = document.createElement('br');
    propertiesCell.appendChild(lineBreak); // Add line break
    propertiesCell.appendChild(document.createTextNode(propertyValue.trim())); // Add property value
});

// Append cells to the row
row.appendChild(mplIdCell);
row.appendChild(stepNameCell);
row.appendChild(headersCell);
row.appendChild(propertiesCell);
row.appendChild(bodyCell);

// Append the row to the table
tableBody.appendChild(row);
                });
            } else {
                console.error('Invalid data format in the response');
            }
        })
        .catch(error => {
            console.error('Error loading table data:', error);
        });
};
    // Create a variable to keep track of the sorting order for each column
    var sortOrders = [null, null, null, null, null]; // One entry for each column

    function sortTable(column) {
        // Get the table, rows, and sort order
        var table = document.getElementById("dataTable2");
        var rows = Array.from(table.rows).slice(1); // Exclude the header row

        // Determine the sorting order for this column
        var sortOrder = sortOrders[column];

        // If sortOrder is null, start with ascending, otherwise toggle
        sortOrder = sortOrder === null ? "asc" : (sortOrder === "asc" ? "desc" : "asc");

        // Sort the rows based on the selected column and sortOrder
        rows.sort(function(a, b) {
            var aValue = a.cells[column].textContent.trim();
            var bValue = b.cells[column].textContent.trim();

            if (sortOrder === "asc") {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });

        // Update the table with the sorted rows
        for (var i = 0; i < rows.length; i++) {
            table.tBodies[0].appendChild(rows[i]);
        }

        // Reset the sort order for all columns
        for (var i = 0; i < sortOrders.length; i++) {
            sortOrders[i] = null;
        }

        // Set the sort order for the selected column
        sortOrders[column] = sortOrder;

        // Remove the sorted class from all columns
        var headerCells = table.querySelectorAll("th");
        headerCells.forEach(function(cell) {
            cell.classList.remove("sorted-asc", "sorted-desc");
        });

        // Add the sorted class to the selected column
        var selectedHeader = headerCells[column];
        selectedHeader.classList.add("sorted-" + sortOrder);
    }

// Call the function to load table data when the page loads
window.addEventListener('load', loadTableData);
