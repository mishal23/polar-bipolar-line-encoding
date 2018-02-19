var string = "";
string+="In NRZ-L the level of voltage determines the value of the bit.<br>"
string+="Rules:<br>"
string+="0 bit is represented by +V<br>"
string+="1 bit is represented by -V"

// Typing Content
$("#about_nrz-l").typed({
    strings: [
      string
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
			console.log(arr_databit);
			var x_axis=[];
			var y_axis = [];
			var i=0;
			var k=0;
			if(arr_databit[0]==0)
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
			for(var i=0;i<arr_databit.length;i++)
			{	
				if(arr_databit[i]==1)
				{	
					x_axis[k] = k;
					y_axis[k] = -1*voltage;
				}
				else
				{
					x_axis[k] = k;
					y_axis[k] = 1*voltage;	
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
