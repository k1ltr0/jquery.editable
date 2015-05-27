/**
 * version 0.1
 */

String.prototype.unformatMoney = function()
{
    var n = this;
    return parseFloat( n.split("$").join("").split(".").join("").split(",").join("").split(" ").join("")  );
};


(function($) {
    var settings = {};
    
    $.fn.editable = function(options) {

        var set = $.extend({
                    changed: function(old_value, new_value) { },
                    width  : 0,
                    event  : "dblclick"
                }, options);
        
        $(this).each(function()
        {
            $(this).on( set.event, function(){

                var $element = $(this);
                var old_data = parseInt( $element.html().unformatMoney() );

                if ($element.attr( "lp-editing" ) == "true")
                    return true;

                $element.attr( "lp-editing", "true" );

                if ( isNaN( old_data ) ) 
                    old_data = 0;

                var obj = $("<input type='text' name='current-editable' placeholder='" + old_data + "' />");

                if (set.width !== 0)
                {
                    obj.css( 'width', (set.width + 8) + "px" );
                }
                else
                {
                    obj.css( 'width', $element.css( 'width' ) );
                }

                obj.blur(function(){
                    $element.html( obj.val() );
                    set.changed.call( $element, old_data, obj.val() );
                    $element.attr( "lp-editing", "false" );
                });

                obj.keyup(function(evt)
                {
                    if (evt.keyCode == 13) 
                        obj.blur();

                    if (evt.keyCode == 27)
                    {
                        obj.val( old_data );
                        obj.blur();
                    }
                });

                $element.html(obj);
                obj.focus();
            });
        });
    };

})(jQuery);