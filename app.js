  (function ( $ ) {
    
    var multiselect = function($this, $current) {

    $thisButton = $this.parent().parent().find('button');
    $name = $this.find("input:checkbox").attr('name');
    $checkbox = $this.find("input:checkbox");
    $thisDropdown = $this.parent().find("input:checkbox[name='"+$name+"']");
    $thisParent = $this.parent();
    $option = $this;
    $currentVal = $checkbox.val();
    $total_items = $thisDropdown.length;
    $this_all = $thisParent.find("input:checkbox[value='all'], input:checkbox[value='']");
    
    if($currentVal === 'all' || $currentVal === ''){
        $checkbox = $thisDropdown;
        $option = $this.parent();
    }else{
        $this_all.prop("checked", false);
        $this_all.parent().find(".glyphicon").removeClass('glyphicon-check').addClass('glyphicon-unchecked');
    }
    
    
    if( ($is_all = $thisDropdown.first().is(':checked') ? true: false) && !$current){
        $thisDropdown.prop("checked", "checked");

    }else if($current){
        $checkbox.prop("checked", !$checkbox.prop("checked"));
    }
    
    $totChecked = $thisParent.find("input:checked[name='"+$name+"'][value != 'all']input:checked[name='"+$name+"'][value != '']").length;

    if($totChecked == ($total_items-1)){
        $thisDropdown.prop("checked", "checked");
        $this_all.prop("checked", true);
        $this_all.parent().find(".glyphicon").removeClass('glyphicon-unchecked').addClass('glyphicon-check');
    }

    $class = $this.find('input').is(':checked') ? 'glyphicon-check' : 'glyphicon-unchecked';
    $option.find(".glyphicon").removeClass('glyphicon-check glyphicon-unchecked');
    $option.find(".glyphicon").addClass($class);  
    
    $text = $totChecked > 0 ? $totChecked+' '+$thisButton.attr('data-name')+ ($totChecked > 1 ? 's' : '') : $thisButton.attr('default-text') ? $thisButton.attr('default-text') : $thisButton.attr('data-name');
    
    $thisButton.html($text+' <span class="caret"></span>');
    
  };
  
  var singleselect = function($this, $current) {
        $thisOption =$this.find("input:radio");
        $thisButton = $this.parent().parent().find('button');
        
        if($current)
        $thisOption.prop("checked", "checked");
        
        $currentChecked = $this.parent().find("input:checked");
        $name = $currentChecked.parent().text();
        $name = (!$name) ? $thisButton.attr('data-name') : $name;
        
        $this.parent().find('li').removeClass('active');
        $currentChecked.parent().addClass('active');
        $thisButton.html($name+' <span class="caret"></span>');
  };
  
  $.fn.initializeDropdown = function($func) {
      
        $func = $func ? multiselect : singleselect;
      
        this.find('li').each(function() { 
            $func($(this), false);
        });
        
        this.find('li').click(function(e) {
            if($func == multiselect)
            e.stopPropagation();
            
            $func($(this), true);
        });
  };
  
  
  $( ".dropdown-menu.single-select" ).initializeDropdown();
  $( ".dropdown-menu.multi-select" ).initializeDropdown(true);
  
 
}( jQuery ));
