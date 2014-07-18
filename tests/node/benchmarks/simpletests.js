'use strict';

var bencode = require('../../../')

module.exports = {
	name: 'Bencode Library Bencharking',
	  tests: [
	          {name:
	        	  'Plain Dictionary',
	    	defer: true,
	    	fn: function(deferred){
	    		bencode.encode({"bar": "spam", "foo": 42}, function(err, data){	
	    			bencode.decode(data, function(err, dData){
	    				return deferred.resolve();
	    			});				
	    		});
	    	}
	    },
	    {name:'Array value in dictionary',
	    	defer: true,
	    	fn: function(deferred){
	    		bencode.encode({"bar": ["spam", "foo", 42]}, function(err, data){
	    			//console.log(data);
	    			//expect(data).to.equal('d3:bar4:spam3:fooi42ee');
	    			bencode.decode(data, function(err, dData){
	    				return deferred.resolve();
	    			});				
	    		});	
	    	}
	    },
	    {name:'Array value itself is an Array',
	    	defer: true,
	    	fn: function(deferred){
	    		bencode.encode({"bar": [["spam", "foo", 42]]}, function(err, data){
	    			//console.log(data);
	    			//expect(data).to.equal('d3:bar4:spam3:fooi42ee');
	    			bencode.decode(data, function(err, dData){
	    				return deferred.resolve();
	    			});
	    		});
	    	}
	    },
	    {name:'Dictionary as the value',
	    	defer: true,
	    	fn: function(deferred){
	    		bencode.encode({"bar": { bar:["spam", "foo", 42]}}, function(err, data){
	    			bencode.decode(data, function(err, dData){
	    				return deferred.resolve();
	    			});
	    		});
	    	}
	    }
	  ]	
}