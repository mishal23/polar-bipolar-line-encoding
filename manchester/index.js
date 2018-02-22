var string = "";
string+="It is the combination of RZ and NRZ-L.<br>" 
string+="The duration of bit is divided into 2 halves it remains at one level in first half and other level in second half."


$("#about_manchester").typed({
    strings: [
      string
    ],
    typeSpeed: 0,
  });



$(document).ready(function () {

	particlesJS.load('particles-js', '../particles.json', function() {
		console.log('particles.json config loaded');
	});

	$('#terminal').height(1.3 * $('#data-entry').height());


	$('#submit').click(function(){
		var data_bit = $('#data_bit').val();
		var voltage = $("#voltage").val();
		if(data_bit==="" && voltage==="")
		{
			 Materialize.toast('Please enter data bits and voltage', 1000, 'black')
		}
		else if(data_bit==="")
		{
			Materialize.toast('Please enter data bits', 1000, 'black')	
		}
		else if(voltage==="")
		{
			Materialize.toast('Please enter voltage', 1000, 'black')	
		}
		else
		{
			console.log(data_bit);
			console.log(voltage);	
			arr_databit = data_bit.toString();
			var proper = true;
			var count=0;
			for(i=0;i<arr_databit.length;i++)
			{
				if(arr_databit[i]==="0" || arr_databit[i]==="1")
				{
					count++;
				}
			}
			if(count!==arr_databit.length)
			{
				proper=false;
			}
			if(!Number(voltage) && !proper)
			{
				Materialize.toast('Please enter numerical value of voltage only, and binary databits only', 2000, 'black');
			}
			else if(!Number(voltage))
			{	
				Materialize.toast('Please enter numerical value of voltage only', 2000, 'black');
			}
			else if(!proper)
			{
				Materialize.toast('Please enter binary databits only', 2000, 'black');
			}
			else
			{
				var x_axis=[];
				var y_axis = [];
				var i=0;
				var k=0;
				if(arr_databit[0]=="0")
				{
					x_axis[k] = k;
					y_axis[k] = 1*voltage;
					k++;
				}
				else
				{
					x_axis[k] = k;
					y_axis[k] = -1*voltage;	
					k++;
					
				}
				
				for(var i=0;i<arr_databit.length;i++)
				{	
					if(arr_databit[i]=="1")
					{	
					x_axis[k] = k;
					y_axis[k] = -1*voltage;	
					k++;
					x_axis[k] = k;
					y_axis[k] = 1*voltage;
					k++;
					}
					else
					{
					x_axis[k] = k;
					y_axis[k] = 1*voltage;
					k++;
					x_axis[k]=k;
					y_axis[k]=-1*voltage;
					k++;
					}
					
				}

				console.log(x_axis);
				console.log(y_axis);
				var copy_x_axis = [];
				var pos=0.5;
				copy_x_axis[0]=0;
				for(var i=0;i<x_axis.length;i++)
				{
					if(i!=0)
					{
						copy_x_axis[i]=pos;
						console.log(copy_x_axis[i]);
						pos+=0.5;
					}
				}
				var trace4 = {
				  x: copy_x_axis, 
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

				Plotly.newPlot('manchester', data, layout);
			}

		}
		
	});
})