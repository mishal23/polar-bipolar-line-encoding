$("#about_nrz-i").typed({
    strings: [
      "Here is all about NRZ-I",
    ],
    typeSpeed: 0,
  });

$(document).ready(function () {

	particlesJS.load('particles-js', '../particles.json', function() {
		console.log('callback - particles.json config loaded');
	});

	$('#terminal-like').height($('#aboutmecontent').height());

	$('#submit').click(function(){
		var data_bit = $('#data_bit').val();
		var voltage = $("#voltage").val();
		if(data_bit==="" && voltage==="")
		{
			 Materialize.toast('Please enter data bits and voltage', 1000)
		}
		else if(data_bit==="")
		{
			Materialize.toast('Please enter data bits', 1000)	
		}
		else if(voltage==="")
		{
			Materialize.toast('Please enter voltage', 1000)	
		}
		else
		{
			console.log(data_bit);
			console.log(voltage);	

			arr_databit = data_bit.toString();
			
			var x_axis=[];
			var y_axis = [];
			var i=0;
			var k=0;
			console.log(arr_databit);
			if(arr_databit[0]=="0")
			{
				x_axis[k] = k;
				y_axis[k] = 1*voltage;
			}
			else
			{
				x_axis[k] = k;
				y_axis[k] = -1*voltage;	
			}
			k++;
			for(var i=0;i<=arr_databit.length-1;i++)
			{	
				if(i==0)
				{
					console.log("0 mein ghussa");
					if(arr_databit[0]=="0")
					{
						console.log("0 mila");
						x_axis[k] = k;
						y_axis[k] = 1*voltage;
					}
					else
					{
						x_axis[k] = k;
						y_axis[k] = -1*voltage;	
					}
				}
				else
				{
					if(arr_databit[i]=="0")
					{	
						x_axis[k] = k;
						y_axis[k] = y_axis[k-1];
					}
					else
					{
						x_axis[k] = k;
						y_axis[k] = -1*y_axis[k-1];	
					}
				}
				k++;
			}

			console.log(x_axis);
			console.log(y_axis);

			var trace4 = {
			  x: x_axis, 
			  y: y_axis, 
			  mode: 'lines+markers', 
			  name: 'vh', 
			  line: {shape: 'vh'}, 
			  type: 'scatter'
			};


			var data = [trace4];

			var layout = {legend: {
			    y: 0, 
			    traceorder: 'reversed', 
			    font: {size: 16}, 
			    yref: 'paper'
			}};

			Plotly.newPlot('myDiv', data, layout);

		}
		
	});
})
