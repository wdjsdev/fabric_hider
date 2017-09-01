

function promptBatch()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var swatches = docRef.swatches;
	var sel = docRef.selection;


	function test(rect)
	{
		docRef = app.activeDocument;
		layers = docRef.layers;
		swatches = docRef.swatches;

		var bkg = layers["BKGRD, do not unlock"];
		bkg.locked = false;
		var hider = bkg.pathItems.rectangle(rect[0],rect[1],rect[2],rect[3])
		hider.name = "Fabric Hider";
		hider.fillColor = swatches["Info B"].color;
		hider.fillColor.tint = 0;
		hider.stroked = false;
		bkg.locked = true;

		var info = layers[0].layers["Information"];
		info.locked = false;
		var fab = info.textFrames["Fabric Type"];
		fab.textRange.characterAttributes.fillColor = swatches["Info B"].color;
		fab.textRange.characterAttributes.fillColor.tint = 100;
		fab.contents = "";
		info.locked = true;

		
	}




	if(sel.length==0)
	{
		alert("You must create a box that covers the fabric callout and make sure it's selected when you run the script.")
		return;
	}
	else if(sel.length == 1)
	{
		sel = sel[0];
	}
	else
	{
		alert("You have too many items selected. Please create a single box that covers the fabric callout and select only that box.");
		return;
	}

	var rect = [sel.top,sel.left,sel.width,sel.height];

	sel.remove();

	var batch = prompt("Type \"one\" to add fabric hider to current document. Or type \"all\" to batch all open documents", "one");

	if(batch == null)
	{
		return;
	}

	if(batch.toLowerCase() == "all")
	{
		while(app.documents.length>0)
		{
			test(rect);
			docRef.close(SaveOptions.SAVECHANGES);
		}
	}
	else if(batch.toLowerCase() == "one")
	{
		test(rect);
	}
	else
	{
		alert("Invalid Selection.\nYou must type either \"all\" or \"none\"");
		return;
	}
}
promptBatch();
