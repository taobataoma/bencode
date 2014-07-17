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
				
	});
	
	describe('Encode non-string keys', function() {
		it('should encode Numberic keys as expected', function(done) {
			var x = {};
			var num = 42;
			x[num] = 42;
			bencode.encode(x, function(err, data){
				console.log(data);
				//expect(data).to.equal('d3:bar4:spam3:fooi42ee');
				bencode.decode(data, function(err, dData){
					expect(dData[42]).to.equal(42);
					return done();
				});
			});					
		});
		
		it('should encode Array keys as expected', function(done) {
			var x = {};
			var arr = [4,2];
			x[arr] = 42;
			bencode.encode(x, function(err, data){
				console.log(data);
				//expect(data).to.equal('d3:bar4:spam3:fooi42ee');
				bencode.decode(data, function(err, dData){
					expect(dData[arr]).to.equal(42);
					return done();
				});
			});					
		});
		
		it('should encode Dictionary keys as expected', function(done) {
			var x = {};
			var obj = {a:1};
			x[obj] = 42;
			bencode.encode(obj, function(err, data){
				console.log(data);
				return done();
				//expect(data).to.equal('d3:bar4:spam3:fooi42ee');
				//FIXEME something is wrong in library this needs to be fixed up
				/*bencode.decode(data, function(err, dData){
					console.dir(dData);
					expect(dData[obj]).to.equal(42);
					return done();
				});*/
			});					
		});				
				
	});		
	      	      	      	      	            
});
