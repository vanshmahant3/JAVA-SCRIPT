$(document).ready(function () {
    $("#viewOrdersBtn").click(function () {
        // Hide previous error message
        $("#errorMessage").hide().text("");

        // 2. Use $.getJSON() to retrieve data from orders.json
        $.getJSON("orders.json", function (data) {
            // 5. Do not allow duplicate rows if the View Orders button is clicked multiple times
            $("#ordersTableBody").empty();

            let totalOrders = 0;
            let totalSales = 0;

            // 4. Use $.each() to process all the JSON records
            $.each(data, function (index, order) {
                totalOrders++;
                totalSales += Number(order.totalAmount);

                // Set status badge style
                let statusClass = "status";
                let statusLower = (order.orderStatus || "").toLowerCase();
                if (statusLower === "preparing") {
                    statusClass += " status-preparing";
                } else if (statusLower === "ready") {
                    statusClass += " status-ready";
                } else if (statusLower === "delivered") {
                    statusClass += " status-delivered";
                }

                // 3. Display the orders dynamically in an HTML table
                let row = `
                    <tr>
                        <td>${order.orderId}</td>
                        <td>${order.customerName}</td>
                        <td>${order.foodItem}</td>
                        <td>${order.quantity}</td>
                        <td>₹${order.totalAmount}</td>
                        <td><span class="${statusClass}">${order.orderStatus}</span></td>
                    </tr>
                `;
                $("#ordersTableBody").append(row);
            });

            // 6. Display the total number of orders below the table
            $("#totalOrdersCount").text(totalOrders);

            // 7. Calculate and display the total sales amount of all orders
            $("#totalSalesAmount").text("₹" + totalSales);

        }).fail(function (jqXHR, textStatus, errorThrown) {
            // 8. Display an appropriate message if orders.json cannot be loaded
            let msg = "Error: Unable to load 'orders.json'. Please ensure the file is present and accessible.";
            $("#errorMessage").text(msg).show();
        });
    });
});
