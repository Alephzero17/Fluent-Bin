////////////////////////////////////////////////////////////////////////////////
//
//  THIS CODE IS NOT APPROVED FOR USE IN/ON ANY OTHER UI ELEMENT OR PRODUCT COMPONENT.
//  http://se7enth.com
//  Copyright (c) 2006 Seventh Sense Studio.  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
var gadgetWidth;
var gadgetHeight;
var isEmpty = (System.Shell.RecycleBin.fileCount + System.Shell.RecycleBin.folderCount == 0);

////////////////////////////////////////////////////////////////////////////////
//
// GADGET FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////
window.onload = function()
{
	// add event handlers
	System.Gadget.onUndock = checkPosition;
	System.Gadget.onDock = checkPosition;
	System.Gadget.Sidebar.onDockSideChanged = checkPosition;
	System.Shell.RecycleBin.onRecycleBinChanged = updateGadget;
	document.body.ondrop = dropItem;
	hitbox.ondragenter = cancelEvent;
	hitbox.ondragover = cancelEvent;
	hitbox.onmouseup = toggleFlyout;

	// flyout
	System.Gadget.Flyout.file = "flyout.html";

	// initialize gadget
	updateGadget();
}

////////////////////////////////////////////////////////////////////////////////
// start gadget animation
////////////////////////////////////////////////////////////////////////////////
function updateGadget()
{
	isEmpty = (System.Shell.RecycleBin.fileCount + System.Shell.RecycleBin.folderCount == 0);
	checkPosition();
}

////////////////////////////////////////////////////////////////////////////////
// add dragged items into Recycle Bin
////////////////////////////////////////////////////////////////////////////////
function dropItem()
{
	var item;
	var index = 0;
	do
	{ 
		item = System.Shell.itemFromFileDrop(event.dataTransfer, index);
		if (item)
		{
			System.Shell.RecycleBin.deleteItem(item.path);
		}
		index++;
	} while (item != null);
}

function cancelEvent()
{
	event.returnValue = false;
}

////////////////////////////////////////////////////////////////////////////////
// toggle flyout
////////////////////////////////////////////////////////////////////////////////
function toggleFlyout()
{
	hitbox.blur();
	System.Gadget.Flyout.show = !System.Gadget.Flyout.show;
}

////////////////////////////////////////////////////////////////////////////////
// styles for gadget when UNDOCKED
////////////////////////////////////////////////////////////////////////////////
function applyUndockedStyles()
{
	gadgetWidth = "128px";
	gadgetHeight = "128px";

	background.removeObjects();
	var imgBin = isEmpty ? "images/EmptyUndocked.png" : "images/FullUndocked.png";
	background.addImageObject(imgBin, 0, 0);
	hitbox.style.width = gadgetWidth;
}

////////////////////////////////////////////////////////////////////////////////
// styles for gadget when DOCKED
////////////////////////////////////////////////////////////////////////////////
function applyDockedStyles()
{
	gadgetWidth = "130px";
	gadgetHeight = "64px";

	background.removeObjects();
	var imgBin = isEmpty ? "images/EmptyDocked.png" : "images/FullDocked.png";
	var _xOffset = (System.Gadget.Sidebar.dockSide == "Right") ? 64 : 0;
	background.addImageObject(imgBin, _xOffset, 0);
	hitbox.style.width = (gadgetWidth.replace("px", "") - _xOffset) + "px";
	hitbox.style.left = _xOffset + "px";
}

////////////////////////////////////////////////////////////////////////////////
// determine if gadget is in sidebar - docked or on the desktop - undocked
////////////////////////////////////////////////////////////////////////////////
function checkPosition()
{
	if (System.Gadget.docked)
	{
		applyDockedStyles();
	}
	else
	{
		applyUndockedStyles();
	}

	with (document.body.style)
	{
		width = gadgetWidth;
		height = gadgetHeight;
	}

	background.style.width = gadgetWidth;
	background.style.height = gadgetHeight;
	hitbox.style.height = gadgetHeight;
}
