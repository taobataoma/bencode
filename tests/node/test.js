'use strict';

var expect = require('chai').expect;
var bencode = require('../../');

describe('test it All Up', function() {
	before(function(done) {
		return done();
	});

	describe('Basic Encode tests', function() {
		it('should encode as String and Numbers as expected', function(done) {
			bencode.encode({"bar": "spam", "foo": 42}, function(err, data){
				//console.log(data);
				expect(data).to.equal('d3:bar4:spam3:fooi42ee');
				
				bencode.decode(data, function(err, dData){
					expect(dData.bar).to.equal('spam');
					expect(dData.foo).to.equal(42);
					return done();
				});				
			});					
		});
		
		it('should encode Arrays as expected', function(done) {
			bencode.encode({"bar": ["spam", "foo", 42]}, function(err, data){
				console.log(data);
				//expect(data).to.equal('d3:bar4:spam3:fooi42ee');
				bencode.decode(data, function(err, dData){
					expect(dData.bar[0]).to.equal("spam");
					expect(dData.bar[1]).to.equal("foo");
					expect(dData.bar[2]).to.equal(42);
					return done();
				});				
			});					
		});
		
		it('should encode SubArrays as expected', function(done) {
			bencode.encode({"bar": [["spam", "foo", 42]]}, function(err, data){
				console.log(data);
				//expect(data).to.equal('d3:bar4:spam3:fooi42ee');
				bencode.decode(data, function(err, dData){
					expect(dData.bar[0][0]).to.equal("spam");
					expect(dData.bar[0][1]).to.equal("foo");
					expect(dData.bar[0][2]).to.equal(42);
					return done();
				});
			});					
		});
		
		it('should encode Array contained dictionary as expected', function(done) {
			bencode.encode({"bar": [{ bar:["spam", "foo", 42]}]}, function(err, data){
				console.log(data);
				//expect(data).to.equal('d3:bar4:spam3:fooi42ee');
				bencode.decode(data, function(err, dData){
					expect(dData.bar[0].bar[0]).to.equal("spam");
					expect(dData.bar[0].bar[1]).to.equal("foo");
					expect(dData.bar[0].bar[2]).to.equal(42);
					return done();
				});
			});					
		});
		
		it('should encode sub-dictionary as expected', function(done) {
			bencode.encode({"bar": { bar:["spam", "foo", 42]}}, function(err, data){
				console.log(data);
				//expect(data).to.equal('d3:bar4:spam3:fooi42ee');
				bencode.decode(data, function(err, dData){
					expect(dData.bar.bar[0]).to.equal("spam");
					expect(dData.bar.bar[1]).to.equal("foo");
					expect(dData.bar.bar[2]).to.equal(42);
					return done();
				});
			});					
		});
				
	});
	
	/*describe('Encode non-string keys', function() {});*/		
	      	      	      	      	            
});
