
/*
 *	Meta-data Class
 *
 *	Example of usage:
 *
 *	var meta = new MetaClass();
 *	meta.SetTitle( "New Page Title" ); // sets page title variable for class and updates title for page
 *	meta.GetTitle(); // returns new page title 
 *
 */

function MetaClass()
{
    var _title = "Page Title";
    var _description = "The meta description of this page.";
	this.GetTitle = GetTitle;
    this.GetDescription = GetDescription;
    this.SetTitle = SetTitle;
    this.SetDescription = SetDescription;

    function GetTitle()
    {
		return _title;
    }

    function GetDescription()
    {
        return _description;
    }

    function SetTitle( newVal ) 
    {
        _title = newVal;
		$('title').val( _title );
    }

    function SetDescription( newVal ) 
    {
        _description = newVal;
		$('meta[name=description]').attr( 'content' , _description );
    }
}